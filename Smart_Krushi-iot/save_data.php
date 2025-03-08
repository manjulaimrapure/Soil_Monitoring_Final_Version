<?php
$servername = "localhost";
$username = "root";  // Change this if using a live server
$password = "";      // Default password for XAMPP is empty
$dbname = "sensor_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$moisture = $_POST['moisture'];
$temperatureC = $_POST['temperatureC'];
$temperatureF = $_POST['temperatureF'];

// Generate random NPK values
$nitrogen = rand(30, 90);    // Nitrogen: 30-90 kg/ha
$phosphorus = rand(30, 60);  // Phosphorus: 30-60 kg/ha
$potassium = rand(20, 40);   // Potassium: 20-40 kg/ha

// Randomly select soil type and crop
$soil_types = ["Loamy", "Red"];
$crops = ["Banana", "Cotton"];

$soil_type = $soil_types[array_rand($soil_types)];
$crop = $crops[array_rand($crops)];

// SQL query to insert data
$sql = "INSERT INTO readings (moisture, temperatureC, temperatureF, nitrogen, phosphorus, potassium, soil_type, crop) 
        VALUES ('$moisture', '$temperatureC', '$temperatureF', '$nitrogen', '$phosphorus', '$potassium', '$soil_type', '$crop')";

if ($conn->query($sql) === TRUE) {
    echo "Data saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
