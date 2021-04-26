// document.ready when search button is clicked (google)
// reset search value to an empty string 
// on click, make fetch request (open weather)
var getWeatherData = function(city) {
    // format the open weather url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=11f68b1fe37a40e7c0132a32fccac555";
    
    // make a request
    fetch(apiUrl)
    .then(function (response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            console.log("fetch failed")
        }
    });
}
getWeatherData();
// create a func to append search history

// create function to searchWeather and use AJAX to make a GET request
// make fetch() request.
//  use "var units = '&units=imperial'";