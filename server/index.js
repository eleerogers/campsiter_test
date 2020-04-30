require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const https = require('https');
// const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + '/../calc.html'));
})

app.post("/weather", (request, response) => {
  const {city} = request.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a20a3bb27d2abedb5e32e547d3cf9644`
  https.get(url, async (res) => {
    res.on("data", (data) => {
      const weatherData = JSON.parse(data); 
      const {description, icon} = weatherData.weather[0]
      response.send(JSON.stringify({description, icon}));
    })
  })
})

app.post('/calc', (request, response) => {
  const {num1, num2} = request.body;
  const result = Number(num1) + Number(num2)
  response.send(JSON.stringify(result));
})

app.post('/bmiCalc', (request, response) => {
  const {height, weight} = request.body;
  const bmi = Number(weight) / Math.pow(Number(height), 2);
  response.send(JSON.stringify(bmi))
})

app.get('/hey', (req, res) => res.send('ho!'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});