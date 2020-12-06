// Data pulled from user
var cityName = "";
var lat = 0;
var lon = 0;

// API key


// URLs to pull from API
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

var forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
