// City Data Variables
var cityName = "";

// API key
var APIKey = "b3ba97da6b3e519c3ebd004958f21e41";

// URLs to pull from API
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=&appid=${APIKey}`;

var forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=&appid=${APIKey}`;

var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=&lon=&appid=${APIKey}`;

// Listen for city name submission
$("form").submit(function (event) {
    event.preventDefault();
    cityName = $("#city")[0].value;

    currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    getDetails();
});

//Listen for history button resubmission
$("section").on("click", function(event) {
    //Reset City Variable
    cityName = event.target.value;
    //Reset Links with new city
    currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
    //Update display
    getDetails();
});

//API call for information and display
function getDetails() {
    $.ajax({
        url: currentWeather,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            //API call for UV Index information
            uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;
            //Add to search history
            $("section").prepend(`<hr><button id=${cityName} value=${cityName}>${cityName}`);
            //localStorage.setItem(button, cityName);

            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            //Display weather data
            $(".name").text(`${response.name}`);
            $(".temp").text(`${tempF.toFixed(2)}`);
            $(".humidity").text(`${response.main.humidity}%`);
            $(".wind").text(`${response.wind.speed}MPH`);
            $(".picture").html(`<img src='http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png'>`);


            //Call for UV Index
            $.ajax({
                url: uvIndex,
                method: "GET"
            })
                .then(function (response) {
                    //Set color depending on severity
                    if (response.value < 3) {
                        $(".UV").css("background-color", "green");
                        $(".UV").css("color", "white");
                    }
                    if (response.value >= 3 && response.value < 6) {
                        $(".UV").css("background-color", "gold");
                        $(".UV").css("color", "white");
                    }
                    if (response.value >= 9) {
                        $(".UV").css("background-color", "red");
                        $(".UV").css("color", "white");
                    }
                    
                    //Display UV
                    $(".UV").html(`${response.value}`);
                })

            //Call for forcast
            $.ajax({
                url: forcastFive,
                method: "GET"
            })
                .then(function (response) {
                    //Loop for each day
                    for (let i = 0; i < 5; i++) {
                        
                        let spot = 8*i + 3;
                        
                        let tempNew = (response.list[spot].main.temp - 273.15) * 1.80 + 32;
                        
                        //Block Print out
                        $(`#day${i}`).html(`${response.list[spot].dt_txt}<br>
                        ${response.list[spot].weather[0].main}<br>
                        <img src='http://openweathermap.org/img/wn/${response.list[spot].weather[0].icon}@2x.png'><br>
                        Temperature: ${tempNew.toFixed(2)}F<br>
                        Humidity: ${response.list[spot].main.humidity}%`);
                    };
                })


        })
};
