// Personal API Key for OpenWeatherMap API
const API_KEY="4747ee87360f068416cb9cc5df95bf1e";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateBtn = document.getElementById("generate");
// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

//perhaps branch out to city instead, more fun?

/* Function to GET Web API Data*/
const getWeather = async (url) => {
    //before calling this, ensure the right string concatenation occurs
    const response = await fetch(url) 
    try {
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err)
    }
}

const constructURL = (postalCode) => {
    console.log(`${WEATHER_URL}${postalCode}&APPID=${API_KEY}`)
    return `${WEATHER_URL}${postalCode}&APPID=${API_KEY}`
}

const kelvinToCelsius = (kelvinTemp) => {
    return Math.round(new Number(kelvinTemp) - 273.15);
}

const requestDate = () => {
    const dt = new Date();

    return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`
}

const weatherData = (resJSON, feelings) => {
    return {date: requestDate(),
            temp: kelvinToCelsius(resJSON.main.temp),
            weather: resJSON.weather[0].main,
            weatherDescription: resJSON.weather[0].description,
            userResponse: feelings,
    }
}

generateBtn.addEventListener("click", () => {
    console.log("clicked on generate");
    const postalCode = document.querySelector("#zip").value;
    const feels = document.querySelector("#feelings").value;

    getWeather(constructURL(postalCode)).then((res) => {
        console.log(res);
        console.log(weatherData(res, feels))
        postData("/", weatherData(res, feels));
        
    })

    
})

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(err) {
        console.log(err)
    }
}

/* Function to POST data */


/* Function to GET Project Data */


