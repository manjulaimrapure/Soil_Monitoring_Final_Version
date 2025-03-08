
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Search, Tag, Clock, MessageSquare, ThumbsUp, Filter, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const articles = [
  {
    id: "article1",
    title: "Understanding Soil NPK Levels for Maximum Crop Yield",
    excerpt: "Learn how nitrogen, phosphorus, and potassium levels affect your crop growth and yield potential.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvaWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    author: "Dr. Emily Chen",
    date: "Oct 15, 2023",
    readTime: "8 min read",
    category: "Soil Health",
    featured: true,
  },
  {
    id: "article2",
    title: "Best Practices for Soil Moisture Management",
    excerpt: "Discover techniques to maintain optimal soil moisture levels throughout the growing season.",
    image: "https://images.unsplash.com/photo-1565647952915-9641553310c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlycmlnYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    author: "Mark Johnson",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    category: "Irrigation",
    featured: false,
  },
  {
    id: "article3",
    title: "The Impact of Soil pH on Crop Nutrition",
    excerpt: "How soil pH levels influence nutrient availability and steps to adjust pH for different crops.",
    image: "https://images.unsplash.com/photo-1587383378908-9762644db656?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c29pbCUyMHRlc3Rpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    author: "Dr. Robert Williams",
    date: "Sep 15, 2023",
    readTime: "10 min read",
    category: "Soil Chemistry",
    featured: false,
  },
];

const videos = [
  {
    id: "video1",
    title: "Setting Up Your First Soil Moisture Sensor",
    duration: "5:42",
    thumbnail: "https://images.unsplash.com/photo-1608023133412-516541357726?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2Vuc29yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    views: 1245,
    date: "Aug 10, 2023",
    category: "Tutorials",
  },
  {
    id: "video2",
    title: "Interpreting Soil Test Results",
    duration: "12:18",
    thumbnail: "https://images.unsplash.com/photo-1603912699214-92627f304eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    views: 2867,
    date: "Jul 25, 2023",
    category: "Tutorials",
  },
];

const categories = [
  "Soil Health",
  "Irrigation",
  "Soil Chemistry",
  "Crop Management",
  "Sensors & Tech",
  "Tutorials",
  "Case Studies",
];

const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"articles" | "videos">("articles");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">Knowledge Hub</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-soil-500" />
          <input 
            type="text"
            placeholder="Search resources..."
            className="pl-10 pr-4 py-2 w-full border border-soil-200 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-soil-200">
            <button
              className={cn(
                "py-2 px-4 font-medium", 
                activeTab === "articles" 
                  ? "text-soil-800 border-b-2 border-soil-600" 
                  : "text-soil-600 hover:text-soil-800"
              )}
              onClick={() => setActiveTab("articles")}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Articles
            </button>
            <button
              className={cn(
                "py-2 px-4 font-medium", 
                activeTab === "videos" 
                  ? "text-soil-800 border-b-2 border-soil-600" 
                  : "text-soil-600 hover:text-soil-800"
              )}
              onClick={() => setActiveTab("videos")}
            >
              <Play className="h-4 w-4 inline mr-2" />
              Video Tutorials
            </button>
          </div>
          
          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              {/* Featured Article */}
              {articles.filter(article => article.featured).map(article => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto bg-soil-200 relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-soil-600 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <span className="text-xs text-soil-600 bg-soil-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <h2 className="text-xl font-bold text-soil-800 mt-2">{article.title}</h2>
                      <p className="text-soil-600 mt-2">{article.excerpt}</p>
                      <div className="flex items-center mt-4 text-sm text-soil-500">
                        <div className="w-6 h-6 rounded-full bg-soil-200 flex items-center justify-center text-soil-700">
                          {article.author.charAt(0)}
                        </div>
                        <span className="ml-2">{article.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                      <Button className="mt-4 bg-soil-600 hover:bg-soil-700">Read Article</Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Regular Articles */}
              <div className="grid md:grid-cols-2 gap-6">
                {articles.filter(article => !article.featured).map(article => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="h-40 bg-soil-200">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <span className="text-xs text-soil-600 bg-soil-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-semibold text-soil-800 mt-2">{article.title}</h3>
                      <p className="text-soil-600 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center mt-3 text-xs text-soil-500">
                        <div className="w-5 h-5 rounded-full bg-soil-200 flex items-center justify-center text-soil-700">
                          {article.author.charAt(0)}
                        </div>
                        <span className="ml-1.5">{article.author}</span>
                        <span className="mx-1.5">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 text-soil-600">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" /> 65
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-soil-600">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" /> 12
                          </Button>
                        </div>
                        <Button size="sm" variant="outline" className="h-8 text-soil-600">Read</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {videos.map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="h-40 bg-soil-200 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                          <Play className="h-6 w-6 text-soil-800" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <span className="text-xs text-soil-600 bg-soil-100 px-2 py-1 rounded-full">
                        {video.category}
                      </span>
                      <h3 className="text-lg font-semibold text-soil-800 mt-2">{video.title}</h3>
                      <div className="flex items-center mt-3 text-xs text-soil-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{video.date}</span>
                        <span className="mx-1.5">•</span>
                        <span>{video.views} views</span>
                      </div>
                      <Button size="sm" className="mt-3 bg-soil-600 hover:bg-soil-700">Watch Video</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-soil-800 text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-soil-500" />
                    <button className="text-soil-700 hover:text-soil-900">{category}</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-soil-800 text-lg">Popular Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.slice(0, 2).map((article, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-12 h-12 bg-soil-200 rounded overflow-hidden shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-soil-800 line-clamp-2">{article.title}</h4>
                      <p className="text-xs text-soil-500 mt-1">{article.readTime}</p>
                    </div>
                  </div>
                ))}
                {videos.slice(0, 1).map((video, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-12 h-12 bg-soil-200 rounded overflow-hidden relative shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-soil-800 line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-soil-500 mt-1">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
