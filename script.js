// API key
var APIKey = "b3ba97da6b3e519c3ebd004958f21e41";

// URLs to pull from API
var currentWeather = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

var forcastFive = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
