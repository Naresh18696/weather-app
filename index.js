import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherapi.com/v1";
const apiKey = "0ced416e7ef64c6e9a165428263006";
let weatherData;
let advice;
let nowDate;
// App view engine setup for each and every time we didn't given .ejs  *extension
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extends: true }));

// ----------------------
// AI Recommendation
// ----------------------

function getAdvice(weather) {
  const advice = {};

  // Clothing
  if (weather.current.temp_c >= 35) {
    advice.clothing = "Wear light cotton clothes.";
  } else if (weather.current.temp_c >= 25) {
    advice.clothing = "T-shirt is perfect.";
  } else {
    advice.clothing = "Carry a jacket.";
  }

  // Umbrella

  if (weather.current.chance_of_rain > 40) {
    advice.umbrella = "Carry an umbrella ☂";
  } else {
    advice.umbrella = "Umbrella not required";
  }

  // Water

  if (weather.current.temp_c > 35) {
    advice.water = "Drink 3-4 Litres";
  } else {
    advice.water = "Drink at least 2 Litres";
  }

  // UV

  if (weather.current.uv > 7) {
    advice.uv = "Use sunscreen SPF 30+";
  } else {
    advice.uv = "UV level is safe";
  }

  return advice;
}

function getDate(nowDate)
{
    const date = new Date(nowDate);

const formatted = date.toLocaleString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
return formatted;
}
app.get("/", (req, res) => {
  res.render("index.ejs", { weather: weatherData, advice: advice });
});

app.post("/getWeather",async(req,res)=>{
    // console.log(req.body.city);
    const city = req.body.city;
    try {
            // const result =await axios.get(`${API_URL}/current.json?key=${apiKey}&q=${city}`);
            const result =await axios.get(`${API_URL}/forecast.json?key=${apiKey}&q=${city}`);
            // console.log(result.data);
            weatherData = result.data;
            // console.log(weatherData.current.temp_c);
            advice = getAdvice(weatherData);
            nowDate = getDate(weatherData.location.localtime);
            // console.log(nowDate);
            res.render("index",{ weather: weatherData, advice: advice,dateT:nowDate});
    } catch (error) {
        // console.error("❌ Setup Error:", error.message);
        // console.log(error.response.data)
        // console.log(error.response?.data.error?.message);
        res.render("index",{error:error.response?.data.error?.message});
            // res.status(500).json({
            //     success: false,
            //     message: error.message
            // });
    }


})
app.listen(port, () => {
  console.log(`Running port is ${port}`);
});
