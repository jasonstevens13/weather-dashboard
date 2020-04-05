
$(document).ready(function () {

    console.log("hello this is a test 2");

    $("#searchBtn").on("click", function () {
        console.log("search button has been clicked");
    });

    var myApiKey = "030a2eeeb4406f7a775462f8704bfe82";
    var citySearch = "08096";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myApiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Parse city
        console.log(response);
        var cityResult = response.name;
        console.log(cityResult);

        // Parse unix date/time stamp and convert it to local date
        var unixTimeStamp = response.dt;
        var unixTimeStampJS = unixTimeStamp * 1000;
        var newDate = new Date(unixTimeStampJS);
        var date = newDate.toLocaleDateString();
        console.log(date);


        // Parse Kelvin temp and convert to Farenheit
        var tempKelvin = response.main.temp;
        var temp2 = ((((tempKelvin - 273.15) * 9) / 5) + 32);
        var temp1 = (Math.floor(temp2 * 100) / 100);
        var temp = temp1 + " °F";
        console.log(temp);


        // Parse humidity; add % symbol
        var humidity = response.main.humidity + " %";
        console.log(humidity);

        // Parse wind speed
        var windSpeedMetric = response.wind.speed;
        var windSpeed2 = ((windSpeedMetric * 0.000621371) * 60);
        var windSpeed1 = (Math.floor(windSpeed2 * 100) / 100);
        var windSpeed = windSpeed1 + " MPH";

        // var windSpeed = ((windSpeedMetric * 60) * 0.000621371)
        console.log(windSpeed);

        // Take Longitude and Latitude and call api for UV Index > then parse UV index
        var Longitude = response.coord.lon.toString();
        console.log(Longitude);
        var Latitude = response.coord.lat.toString();
        console.log(Latitude);

        //Parse weather icon
        var weatherIconCurrentRaw = response.weather[0].icon;
        var weatherIconCurrent = "https://openweathermap.org/img/wn/" + weatherIconCurrentRaw + "@2x.png";
        console.log(weatherIconCurrent);

        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + Latitude + "&lon=" + Longitude + "&appid=" + myApiKey;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {

            var uvIndex = response2.value;
            console.log(uvIndex);
        });


        // var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + myApiKey;

        var queryURL3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Latitude + "&lon=" + Longitude + "&appid=" + myApiKey;

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response3) {

            // var forecast = response3;
            console.log(response3);

            // need to iterate and grab one 3-hour forecast from each of the 5 days...

            // variables for 5 future days' forecasts
            var day1 = response3.daily[0];
            var day2 = response3.daily[1];
            var day3 = response3.daily[2];
            var day4 = response3.daily[3];
            var day5 = response3.daily[4];
            // variable to parse items needed for 5-day forecasts...
            // dates
            var date1 = day1.dt;
            var date2 = day2.dt;
            var date3 = day3.dt;
            var date4 = day4.dt;
            var date5 = day5.dt;
            // temps
            var date1Temp = day1.temp.day;
            var date2Temp = day2.temp.day;
            var date3Temp = day3.temp.day;
            var date4Temp = day4.temp.day;
            var date5Temp = day5.temp.day;
            // humidity
            var date1Humidity = day1.humidity;
            console.log(date1Humidity);

            var weatherIconDate1Raw = day1.weather[0].icon;
            var weatherIconDate1 = "https://openweathermap.org/img/wn/" + weatherIconDate1Raw + "@2x.png";
            console.log(weatherIconDate1);









        });




    });














});



