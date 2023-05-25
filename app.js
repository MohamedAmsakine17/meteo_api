const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let cityName = req.body.cityName;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=1f3506a205dc5677c554d77de948f4b3&units=metric";
  https.get(url, (respons) => {
    //console.log(respons);
    console.log(respons.statusCode);

    respons.on("data", (data) => {
      let weatherData = JSON.parse(data);
      console.log(weatherData);
      let temp = weatherData.main.temp;
      let weatherDescription = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1> Temp : " + temp + "</h1>");
      res.write("<h2> Description : " + weatherDescription + "</h2>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
