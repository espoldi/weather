// city data variables
var cityName = "";
var cityID = "";

// API key
var APIKey = "b3ba97da6b3e519c3ebd004958f21e41";

// URLs to pull from API
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=&appid=${APIKey}`;
var forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=&appid=${APIKey}`;
var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=&lon=&appid=${APIKey}`;

// Listen for city name submission
$("form").submit(function (event) {
    event.preventDefault();
    // set variable to input data
    cityName = $("#city")[0].value;
    // reset links for API calls
    currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
    // run display for weather
    updateData();
});

// listen for history button resubmission
$("section").on("click", function (event) {
    //Reset City Variable
    cityID = event.target.value;
    cityName = event.target.textContent;
    console.log(cityName);
    //Reset Links with new city
    currentWeather = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${APIKey}`;
    forcastFive = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${APIKey}`;
    //Update display
    updateData();
});

//API call for information and display
function getDetails() {
    $.ajax({
        url: currentWeather,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            // update API call for UV Index
            uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;
            
            //Find city ID from API
            cityID = response.id;
            console.log(cityID);

            //Add to search history
            $("section").prepend(`<hr><button id=${cityID} value=${cityID}>${cityName}`);
            
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
                    console.log(response);

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
                    console.log(response);

                    //Loop for each day
                    for (let i = 0; i < 5; i++) {

                        let spot = 8 * i + 3;

                        let tempNew = (response.list[spot].main.temp - 273.15) * 1.80 + 32;

                        //Block Print out
                        $(`#day${i}`).html(`${response.list[spot].dt_txt}<br>
                        ${response.list[spot].weather[0].main}<br>
                        <img src='http://openweathermap.org/img/wn/${response.list[spot].weather[0].icon}@2x.png'><br>
                        Temp: ${tempNew.toFixed(2)}F<br>
                        Humidity: ${response.list[spot].main.humidity}%`);
                    };
                })


        })
};

function updateData() {
    getDetails();
}