// City Data Variables
var cityName = "";
var lat = 0;
var lon = 0;

// API key
var APIKey = "b3ba97da6b3e519c3ebd004958f21e41";

// URLs to pull from API
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

var forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;

// Listen for city name submission
$("form").submit(function(event) {
    event.preventDefault();
    cityName = $("#city")[0].value;

    currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    getDetails();
});

function getDetails() {
    $.ajax({
        url: currentWeather,
        method: "GET"
      }).then(function(response) {

          console.log(currentWeather);
          console.log(response);
        });
};