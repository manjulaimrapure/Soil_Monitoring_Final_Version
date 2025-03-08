import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorReadings = () => {
  // Component to fetch and display sensor readings

  const [readings, setReadings] = useState(null);
  const [error, setError] = useState(null);

  const fetchReadings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/readings');
      setReadings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch readings');
    }
  };

  useEffect(() => {
    fetchReadings();
    const interval = setInterval(fetchReadings, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }


  // Loading state
  if (!readings) {
    return <div>Loading sensor readings...</div>;
  }


  return (
    <div>
      <h2>Sensor Readings</h2>
      <p>Moisture: {readings.moisture} ({readings.moistureStatus})</p>
      <p>Temperature (C): {readings.temperatureC} ({readings.temperatureStatus})</p>
      <p>Nitrogen: {readings.nitrogen}</p>
      <p>Phosphorus: {readings.phosphorus}</p>
      <p>Potassium: {readings.potassium}</p>
      <p>Timestamp: {new Date(readings.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default SensorReadings;
