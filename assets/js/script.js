$(document).ready(function () {
  var weatherContainerEl = $("#weather-container");
  var currentDate = moment().format("MM DD YY");
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
      fiveDay(cityName);

      weatherContainerEl.text("");
      cityInputEl.val("");
    } else {
      alert("please enter a city name");
    }
  };

  var getCityData = function (city) {
    // format the open weather url
    //  use "var units = '&units=imperial'";
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=11f68b1fe37a40e7c0132a32fccac555";
    console.log(apiUrl);
    fetch(apiUrl).then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          // create current weather section
          var d1 = $("<div>");
          //today momentjs

          var h1 = $("<h1>");
          h1.text(city + " " + currentDate);
          d1.append(h1);

          var img1 = $("<img>");
          var iconcode = data.weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
          console.log(iconurl);
          img1.attr("src", iconurl);
          // <img src="url">
          //img.attr("src",iconurl);
          d1.append(img1);

          // temp
          var p2 = $("<p>");
          p2.text("temperature: " + data.main.temp);
          d1.append(p2);
          // wind
          var p3 = $("<p>");
          p3.text("wind: " + data.wind.speed);
          d1.append(p3);
          // humidity
          var p4 = $("<p>");
          p4.text("humidity: " + data.main.humidity);
          d1.append(p4);

          //call another fecth request with lon and lat
          var p5 = $("<p>");
          var lon = data.coord.lon;
          var lat = data.coord.lat;
          //uv (need a lon and lat)
          var uvURL =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=11f68b1fe37a40e7c0132a32fccac555";
          console.log(uvURL);

          fetch(uvURL).then(function (response) {
            if (response.ok) {
              response.json().then(function (uvdata) {
                var uv = uvdata.current.uvi;
                console.log(uv);
                p5.text(uv);
                d1.append(p5);
              });
            }
          });

          weatherContainerEl.append(d1);
        });
      } else {
        alert("error" + response.statusText);
      }
    });
  };

  var fiveDay = function (city) {
    var fiveDayUrl =
      "api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=11f68b1fe37a40e7c0132a32fccac555";
    console.log(fiveDayUrl);

    // for(var i=0;i<5;i++){
    //   data[i*8].icon
    //dt_txt is the specific date. make it pretty with momentjs
    //moment(dt_txt).format("ll")
    // }
  };

  var cityInputEl = $("#cityName");
  var userFormEl = $("#user-form");

  // create a func to append search history

  // create function to searchWeather and use AJAX to make a GET request
  // make fetch() request.

  $(userFormEl).submit(formSubmitHandler);
});
