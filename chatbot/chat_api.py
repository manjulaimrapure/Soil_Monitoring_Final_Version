from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional, Dict, Any

# Import your existing SQLChatbot class and dependencies
from langchain_google_genai import GoogleGenerativeAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain
from langchain.prompts import PromptTemplate
import google.generativeai as genai
import os
import re

# Create request and response models
class ChatRequest(BaseModel):
    question: str
    user_id: Optional[str] = None  # Optional user ID for session management

class ChatResponse(BaseModel):
    response: str
    sql_query: Optional[str] = None
    query_result: Optional[str] = None
    error: Optional[str] = None

# Initialize FastAPI app
app = FastAPI(title="Farmer SQL Chatbot API", 
              description="API for interacting with a SQL-based chatbot for farmer soil data")

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your existing SQLChatbot class
class SQLChatbot:
    def __init__(self):
        # Set API key
        os.environ['GOOGLE_API_KEY'] = ''
        
        # Initialize Gemini model
        self.llm = GoogleGenerativeAI(
            model="gemini-1.5-pro-latest",
            temperature=0.7,
            n_ctx=4096,
            max_output_tokens=2048,
            top_p=0.8,
            verbose=True
        )
        
        # Connect to database
        self.db = SQLDatabase.from_uri("sqlite:///farmer_soil_data.sqlite")
        
        # Set up memory and conversation
        self.memory = ConversationBufferMemory()
        self.conversation = ConversationChain(
            llm=self.llm,
            memory=self.memory,
            verbose=True
        )
        
        # Create SQL query chain
        self.sql_prompt = PromptTemplate(
            template="""Table info: {schema}
Question: {question}
Generate a valid SQLite query to answer this question. 
IMPORTANT: Return ONLY the SQL query without any explanations, prefixes, or the question itself.""",
            input_variables=["schema", "question"]
        )
        self.sql_chain = create_sql_query_chain(self.llm, self.db)
        
        # Response prompt
        self.response_prompt = PromptTemplate(
            template="""Farmer's Question: {question}
Data Analysis: {result}

Provide a simple and clear answer that a farmer can easily understand. Keep it concise and relevant to farming practices.
1. Red Soil - Cotton
Temperature: 25–30°C
Humidity: 50–60%
Moisture: 20–30%
Nitrogen (N): 50–80 kg/ha
Phosphorus (P): 30–50 kg/ha
Potassium (K): 40–60 kg/ha
2. Loamy Soil - Banana
Temperature: 20–30°C
Humidity: 60–80%
Moisture: 30–50%
Nitrogen (N): 30–90 kg/ha
Phosphorus (P): 30–60 kg/ha
Potassium (K): 20–40 kg/ha
this are standard value, compare it and if value is high or low then give suggestion, do all thing in hindi """,
            input_variables=["question", "result"]
        )
    
    def get_table_schema(self):
        """Get the schema of all tables in the database"""
        tables = self.db.get_table_info()
        return "\n".join(tables)
    
    def clean_sql_query(self, query):
        """Clean the SQL query by removing markdown code blocks, prefixes, and fixing table names"""
        # Remove markdown code block markers
        query = re.sub(r'```\w*\n?', '', query)
        query = re.sub(r'```$', '', query)
        
        # Check if the query contains the actual SQL statement after some text
        sql_pattern = re.search(r'SELECT\s+.*', query, re.IGNORECASE | re.DOTALL)
        if sql_pattern:
            # Extract only the SQL part starting with SELECT
            query = sql_pattern.group(0)
        
        # Remove any common prefixes
        query = re.sub(r'^(SQLQuery|SQL Query|Query|Question):\s*', '', query, flags=re.IGNORECASE)
        query = query.strip()
        
        query = query.replace('SQLQuery:', '')
        return query
    
    def execute_sql_query(self, query):
        """Execute SQL query and return results"""
        try:
            return self.db.run(query)
        except Exception as e:
            return f"Error executing query: {str(e)}"
    
    def process_question(self, user_question):
        """Process user question and return response"""
        try:
            # Get table schema
            schema = self.get_table_schema()
            
            # Generate SQL query
            sql_query = self.sql_chain.invoke({
                "schema": schema,
                "question": user_question
            })
            
            # Clean the SQL query
            cleaned_query = self.clean_sql_query(sql_query)
            
            # Execute query
            query_result = self.execute_sql_query(cleaned_query)
            
            # Generate natural language response
            response = self.llm.invoke(self.response_prompt.format(
                question=user_question,
                result=str(query_result)
            ))

            return {
                "response": response,
                "sql_query": cleaned_query,
                "query_result": query_result
            }
        
        except Exception as e:
            return {
                "error": f"An error occurred: {str(e)}"
            }

# Create a dictionary to store chatbot instances by user_id
chatbot_instances = {}

# API endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to the Farmer SQL Chatbot API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_id = request.user_id or "default"
    
    # Create a new chatbot instance for this user if it doesn't exist
    if user_id not in chatbot_instances:
        chatbot_instances[user_id] = SQLChatbot()
    
    # Process the question
    result = chatbot_instances[user_id].process_question(request.question)
    
    # Check for errors
    if "error" in result:
        return ChatResponse(
            response="",
            error=result["error"]
        )
    
    # Return the response
    return ChatResponse(
        response=result["response"],
        # sql_query=result["sql_query"],
        # query_result=str(result["query_result"])
    )

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Run the API server when the script is executed directly
if __name__ == "__main__":
    uvicorn.run("chat_api:app", host="0.0.0.0", port=8000, reload=True)