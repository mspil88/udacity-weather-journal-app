// Personal API Key for OpenWeatherMap API
const API_KEY="4747ee87360f068416cb9cc5df95bf1e";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateBtn = document.getElementById("generate");
// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

generateBtn.addEventListener("click", () => {
    console.log("clicked on generate")
})


/* Function to GET Web API Data*/
const getWeather = async (url) => {
    //before calling this, ensure the right string concatenation occurs
    const response = await fetch(url) 
    try {
        const data = await response.json();
    } catch(err) {
        console.log(err)
    }
}


/* Function to POST data */


/* Function to GET Project Data */


/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();