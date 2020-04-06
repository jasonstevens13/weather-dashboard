
$(document).ready(function () {


    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var cityInput1 = document.querySelector("#searchBtnInput");
        var citySearch = cityInput1.value;
        var myApiKey = "030a2eeeb4406f7a775462f8704bfe82";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + myApiKey;

        // api call for current weather
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


            // Fill in html with current data
            $("#currentCity").text(cityResult + "(" + date + ")" + "Icon");
            $("#currentTemp").text("Temperature: " + temp);
            $("#currentHumidity").text("Humidity: " + humidity);
            $("#currentWindSpeed").text("Wind Speed: " + windSpeed);


            // second api call to the uv api (must get lon and lat from above data)
            var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + Latitude + "&lon=" + Longitude + "&appid=" + myApiKey;

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {

                var uvIndex = response2.value;
                console.log(uvIndex);

                // Fill in htl with uv index
                $("#currentUV").text("UV Index: " + uvIndex);

            });










            var queryURL3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Latitude + "&lon=" + Longitude + "&appid=" + myApiKey;

            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response3) {

                // var forecast = response3;
                console.log(response3);

                for (let i = 0; i < (response3.daily.length - 2); i++) {

                    var day = response3.daily[i];
                    var date1 = day.dt;
                    var unixTimeStamp = date1;
                    var unixTimeStampJS = unixTimeStamp * 1000;
                    var newDate = new Date(unixTimeStampJS);
                    var date = newDate.toLocaleDateString();
                    var dateTempKelvin = day.temp.day;
                    var temp2 = ((((dateTempKelvin - 273.15) * 9) / 5) + 32);
                    var temp1 = (Math.floor(temp2 * 100) / 100);
                    var dateTemp = temp1 + " °F";
                    var dateHumidity = day.humidity + " %";


                    var weatherIconRaw = day.weather[0].icon;
                    var weatherIcon = "https://openweathermap.org/img/wn/" + weatherIconRaw + "@2x.png";

                    var htmlElIdDate = "#" + [i] + "date";
                    var htmlElIdDateIcon = "#" + [i] + "dateIcon";
                    var htmlElIdDateTemp = "#" + [i] + "dateTemp";
                    var htmlElIdDateHumidity = "#" + [i] + "dateHumidity";

                    $(htmlElIdDate).text(date);
                    $(htmlElIdDateIcon).text("");
                    $(htmlElIdDateTemp).text("Temp: " + dateTemp);
                    $(htmlElIdDateHumidity).text("Humidity: " + dateHumidity);


                }






            });




        });







    });















});



