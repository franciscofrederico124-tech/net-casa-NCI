#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Na_minha_rede_não.";
const char* password = "Sona123456";

const char* serverUrl = "http://SEU_IP:3000/";

#define ledOn = 6;
#define ledTwo = 7;

void setup() {

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    delay(1000);
    Serial.print(".");

  }

  Serial.println("");
  Serial.println("WiFi conectado!");
  Serial.println(WiFi.localIP());
  
  
  pinMode(ledOn, OUTPUT);
  pinMode(ledTwo, OUTPUT);
}

void GetStatus(bool on, bool two)
{
  int onStatus = (on == true) ? 1 : 0;
  int twoStatus = (two == true) ? 1: 0;
  
  digitalWrite(ledOn, onStatus);
  digitalWrite(ledTwo, twoStatus);
}

void loop() {
  
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(serverUrl);
    
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {

      String payload = http.getString();

      DynamicJsonDocument doc(1024);

      DeserializationError error =
        deserializeJson(doc, payload);

      if (!error) {

        bool one = doc["one"];
        bool two = doc["two"];
        
        GetStatus(one, two);
      }

      else {
        Serial.println("Erro JSON");
      }

    }
    else {
      Serial.print("Erro HTTP: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  delay(500);
}