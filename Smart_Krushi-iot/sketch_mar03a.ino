#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

const char* ssid = "Tanay's A35";
const char* password = "12345687";
const char* serverUrl = "http:// 192.168.159.75/save_data.php";  // Change this to your actual server URL

// DS18B20 Temperature Sensor
const int oneWireBus = 4;
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

// Soil Moisture Sensor
const int sensor_pin = A0;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");

    sensors.begin();
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        float moisture_percentage = (100 - ((analogRead(sensor_pin) / 1024.0) * 100));

        sensors.requestTemperatures();
        float temperatureC = sensors.getTempCByIndex(0);
        float temperatureF = sensors.getTempFByIndex(0);

        Serial.print("Moisture: ");
        Serial.print(moisture_percentage);
        Serial.println("%");

        Serial.print("Temperature: ");
        Serial.print(temperatureC);
        Serial.print("°C / ");
        Serial.print(temperatureF);
        Serial.println("°F");

        WiFiClient client;
        HTTPClient http;

        String postData = "moisture=" + String(moisture_percentage) +
                          "&temperatureC=" + String(temperatureC) +
                          "&temperatureF=" + String(temperatureF);

        http.begin(client, serverUrl);
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        int httpResponseCode = http.POST(postData);

        if (httpResponseCode > 0) {
            Serial.print("Server Response: ");
            Serial.println(http.getString());
        } else {
            Serial.print("Error sending data: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    } else {
        Serial.println("WiFi not connected, retrying...");
        WiFi.begin(ssid, password);
    }

    delay(5000);  // Send data every 5 seconds
}