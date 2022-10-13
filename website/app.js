/* Definining global variables including the api key */
const API_KEY="4747ee87360f068416cb9cc5df95bf1e&units=imperial";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateBtn = document.getElementById("generate");
const dateElem = document.querySelector("#date");
const tempElem = document.querySelector("#temp");
const contentElem = document.querySelector("#content");

/* Function to GET Web API Data*/
const getWeather = async (url) => {
    const response = await fetch(url) 
    try {
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err)
    }
}

/* Helper function to construct the url string used for the weather API */
const constructURL = (postalCode) => {

    return `${WEATHER_URL}${postalCode.trim()}&APPID=${API_KEY}`
}

/* Helper function to convert temperature from kelvin to celsius, not implemented*/
const kelvinToCelsius = (kelvinTemp) => {
    return Math.round(new Number(kelvinTemp) - 273.15);
}

/* Helper function to return todays date in yyyy-mm-dd format*/
const requestDate = () => {
    const dt = new Date();

    return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`
}

/*Helper function to create the weather data object including temperature, city, user response, weather and weather description */
const weatherData = (resJSON, feelings) => {
    return {date: requestDate(),
            temp: resJSON.main.temp,
            weather: resJSON.weather[0].main,
            weatherDescription: resJSON.weather[0].description,
            place: resJSON.name,
            userResponse: feelings,
    }
}

/*Function to update the front end with the data that has been posted to the server. This function gets the data from the server
 and then updates the date, temperature and content elements in the front end */
const updateFE = async() => {
    const request = await fetch("/all");
    console.log(request);
    try {
        const allData = await request.json();
        const {date, temperature, userResponse} = allData[0];
        dateElem.textContent = `Date: ${date}`;
        tempElem.textContent = `Temperature: ${temperature}`;
        contentElem.textContent = `Feeling: ${userResponse}`;
        return;
    } catch(err) {
        console.log(err);
    }
}

/*Event listener added to the generate button, this will get the data from the weather API then post the data to the server and then updates the front end with this data */
generateBtn.addEventListener("click", () => {
    console.log("clicked on generate");
    const postalCode = document.querySelector("#zip").value;
    const feels = document.querySelector("#feelings").value;

    getWeather(constructURL(postalCode)).then((res) => {
        postData("/", weatherData(res, feels));
        
        })
        .then((res) => {
            updateFE();
        })   
})

/*Function to post the data back to the server */
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
        return newData;
    } catch(err) {
        console.log(err)
    }
}

