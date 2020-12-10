// City Data Variables
var cityName = "";

// API key
var APIKey = "b3ba97da6b3e519c3ebd004958f21e41";

// URLs to pull from API
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=&appid=${APIKey}`;

var forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=&appid=${APIKey}`;

var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=&lon=&appid=${APIKey}`;

// Listen for city name submission
$("form").submit(function(event) {
    event.preventDefault();
    cityName = $("#city")[0].value;

    currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    getDetails();
});

//API call for information and display
function getDetails() {
    $.ajax({
        url: currentWeather,
        method: "GET"
      })
      
      .then(function(response) {
        console.log(response);
        //API call for UV Index information
        uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;
        
        //Add to search history
        $("section").prepend(`<hr><button id=${response.name}>${response.name}`);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        //Display weather panel
        $(".name").text(`${response.name}`);
        $(".temp").text(`Temperature: ${tempF.toFixed(2)}`);
        $(".humidity").text(`Humidity: ${response.main.humidity}%`);
        $(".wind").text(`Wind Speed: ${response.wind.speed}MPH`);

        //Call for UV Index
        $.ajax({
            url: uvIndex,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            //Display UV
            $(".UV").text(`UV Index: ${response.value}`);
        })
        
      })
};
