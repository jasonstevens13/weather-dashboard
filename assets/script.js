
var cityName = "";
var apiKey = "030a2eeeb4406f7a775462f8704bfe82";

cityName = "Philadelphia"
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;



$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=030a2eeeb4406f7a775462f8704bfe82",
    method: "GET";
}).then(function (response) {

    console.log(response);

});

console.log("hello this is a test")



