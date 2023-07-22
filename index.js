const apiKey= "0a8e6398b75b8745425da84a7f75595d";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(e)=>{

    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue)
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("network Response was not Okay!")
        }

       const data = await response.json();
       const temperature = Math.round(data.main.temp);
       const description = data.weather[0].description
       const icon = data.weather[0].icon

       const details = [
         `Feels Like:  ${Math.round(data.main.feels_like)} `,
         `Humidity: ${data.main.humidity}%`,
         `Wind Speed: ${data.wind.speed} m/s`,

       ]

       weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
       weatherDataEl.querySelector(".temperature" ).textContent = `${temperature}°C`
       weatherDataEl.querySelector(".description").textContent = description;

     weatherDataEl.querySelector(".details").innerHTML = details.map((details)=>`<div>${details}</div>`).join("");
    } catch (error) {


        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "Please Enter Right Name of city...";
        weatherDataEl.querySelector(".details").innerHTML = "";
        
    }
}