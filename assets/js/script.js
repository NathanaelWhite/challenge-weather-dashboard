$(document).ready(function () {
  var weatherContainerEl = $("#weather-container");
  var citySearchTerm = $("#city-search-term");
  var cityInputEl = $("#user-form");
  // document.ready when search button is clicked (google)
  // reset search value to an empty string
  // on click, make fetch request (open weather)

  var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get vlue from input element
    var cityName = cityInputEl.val();

    if (cityName) {
      getCityData(cityName);

      weatherContainerEl.text("");
      cityInputEl.val("");
    } else {
      alert("please enter a city name");
    }
  };

  var getCityData = function (city) {
    // format the open weather url
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=11f68b1fe37a40e7c0132a32fccac555";
    fetch(apiUrl).then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("error" + response.statusText);
      }
    });
  };

  var cityInputEl = $("#cityName");
  var userFormEl = $("#user-form");

  // getCityData(city);
  // var userFormEl = $("#user-form")
  // var cityInputEl = $("#cityName");

  // userFormEl.addEventListener("submit", formSubmitHandler);
  // create a func to append search history

  // create function to searchWeather and use AJAX to make a GET request
  // make fetch() request.
  //  use "var units = '&units=imperial'";

  $(userFormEl).submit(formSubmitHandler);
});
