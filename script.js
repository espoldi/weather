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

function getDetails() {
    $.ajax({
        url: currentWeather,
        method: "GET"
      }).then(function(response) {
        uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;

          console.log(currentWeather);
          console.log(response);
          console.log(uvIndex);
          
          $("section").prepend(`<hr>${response.name}`);
        });
};
