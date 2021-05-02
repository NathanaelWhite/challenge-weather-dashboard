$(document).ready(function () {
  var weatherContainerEl = $("#weather-container");
  var weatherEl = $("#weather");
  var currentDate = moment().format("MM DD YY");
  var cityInputEl = $("#user-form");

  // document.ready when search button is clicked (google)
  // reset search value to an empty string
  // on click, make fetch request (open weather)
  weatherEl.css("display", "none");

  var formSubmitHandler = function (event) {
    weatherEl.css("display", "block");
    // prevent page from refreshing
    event.preventDefault();

    // get vlue from input element
    var cityName = cityInputEl.val();
    console.log(cityName);

    if (cityName) {
      getCityData(cityName);
      fiveDay(cityName);

      weatherContainerEl.text("");
      cityInputEl.val("");
    } else {
      alert("please enter a city name");
    }
    saveWeather(cityName);
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
          h1.append(img1);

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
                p5.text("UVI: " + uv);
                if (uv < 3) {
                  p5.attr("class", "bg-success");
                } else if (uv < 7) {
                  p5.attr("class", "bg-warning");
                } else {
                  p5.attr("class", "bg-danger");
                }
                console.log(uv);
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
    $("#five-day-container").empty();
    var fiveDayUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=11f68b1fe37a40e7c0132a32fccac555";
    console.log(fiveDayUrl);
    fetch(fiveDayUrl).then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (fiveDayData) {

          let d1 = $("#five-day-container");
          
          for (var i = 1; i < 6; i++) {
            //   <div id="five-day-container" class="row">
            // <div class="card">
            //   <div class="card-body">
            //     <h5>date</h5>
            //     <img/>
            //     <p>wind</p>
            //     <p>temp</p>
            //     <p>humidity</p>
            //   </div>
            // </div>

            let d2 = $("<div>");
            d2.attr("class", "card");

            let d3 = $("<div>");
            d3.attr("class", "card-body");

            let h5 = $("<h5>");
            h5.text(fiveDayData.list[(i*8)-1].dt_txt);

            d3.append(h5);

            let img = $("<img>");
            var iconcode = fiveDayData.list[(i*8)-1].weather[0].icon;
            var iconurl =
              "http://openweathermap.org/img/w/" + iconcode + ".png";
            console.log(iconurl);
            img.attr("src", iconurl);
            d3.append(img);

            let p1 = $("<p>");
            p1.text("wind: " + fiveDayData.list[(i*8)-1].wind.speed);
            d3.append(p1);
            let p2 = $("<p>");
            p2.text("temp: " + fiveDayData.list[(i*8)-1].main.temp);
            d3.append(p2);
            let p3 = $("<p>");
            p3.text("humidity: " + fiveDayData.list[(i*8)-1].main.humidity);
            d3.append(p3);

            d2.append(d3);
            d1.append(d2);
            weatherEl.append(d1);
          }
        });
      }
    });
  };
  

  var saveWeather = function(city) {
    var localStorageCities = JSON.parse(localStorage.getItem("savedCities"));
    if (!localStorageCities) {
      localStorageCities = [] 
    }
    localStorageCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(localStorageCities));
  };
  // for(var i=0;i<5;i++){
  //   data[i*8].icon
  //dt_txt is the specific date. make it pretty with momentjs
  //moment(dt_txt).format("ll")
  // }

  var cityInputEl = $("#cityName");
  var userFormEl = $("#user-form");

  // create a func to append search history

  $(userFormEl).submit(formSubmitHandler);
});
