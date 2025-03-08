import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv'; dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Create MySQL connection pool with XAMPP default settings
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Password',  // XAMPP's default MySQL password is empty
  database: 'sensor_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


app.get('/', (req, res) => {
  res.send('Sensor API is running');
});

// Get latest sensor readings including NPK values
app.get('/readings', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Fetch the most recent reading including NPK values
    const [rows] = await connection.query(
      `SELECT id, moisture, temperatureC, temperatureF, nitrogen, phosphorus, potassium, timestamp 
       FROM readings 
       ORDER BY timestamp DESC 
       LIMIT 1`
    );
    
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No sensor readings found' });
    }
    
    const reading = rows[0];
    
    // Determine status based on values
    const moistureStatus = determineMoistureStatus(reading.moisture);
    const temperatureStatus = determineTemperatureStatus(reading.temperatureC);
    
    // Return formatted response including NPK values
    res.json({
      id: reading.id,
      moisture: reading.moisture,
      moistureStatus,
      temperatureC: reading.temperatureC,
      temperatureF: reading.temperatureF,
      temperatureStatus,
      nitrogen: reading.nitrogen,
      phosphorus: reading.phosphorus,
      potassium: reading.potassium,
      timestamp: reading.timestamp,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve sensor readings' });
  }
});

// Helper functions to determine status
function determineMoistureStatus(value) {
  if (value < 20 || value > 80) return 'critical';
  if (value < 30 || value > 70) return 'warning';
  return 'good';
}

function determineTemperatureStatus(value) {
  if (value < 10 || value > 35) return 'critical';
  if (value < 15 || value > 30) return 'warning';
  return 'good';
}


app.listen(PORT, () => {
  console.log(`Sensor API server running on port ${PORT}`);
});
