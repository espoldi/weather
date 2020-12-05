// Data pulled from user
var cityName = "";
var lat = 0;
var lon = 0;

// API key


// URLs to pull from API
var currentWeather = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

var forcastFive = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
