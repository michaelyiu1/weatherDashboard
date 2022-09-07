// creating variables by element class names 
var submitBtn = $('.submit');
var currentWeather = $('.current-weather');
var currentTemp = $('.current-temp');
var currentHumidity = $('.current-humidity');
var currentWind = $('.current-wind');
var currentUV = $('.current-uv');
var currentCityDate = $('.current-city-date');
var weatherDisplay = $('.weather-display');
var newCityButton = $('.input-group');

//Creating variables for 5 day weather forecast
var day1date = $('.day-1-date');
var day2date = $('.day-2-date');
var day3date = $('.day-3-date');
var day4date = $('.day-4-date');
var day5date = $('.day-5-date');

var day1weather = $('.day-1-weather');
var day2weather = $('.day-2-weather');
var day3weather = $('.day-3-weather');
var day4weather = $('.day-4-weather');
var day5weather = $('.day-5-weather');

var day1temp = $('.day-1-temp');
var day2temp = $('.day-2-temp');
var day3temp = $('.day-3-temp');
var day4temp = $('.day-4-temp');
var day5temp = $('.day-5-temp');

var day1wind = $('.day-1-wind');
var day2wind = $('.day-2-wind');
var day3wind = $('.day-3-wind');
var day4wind = $('.day-4-wind');
var day5wind = $('.day-5-wind');

var day1humidity = $('.day-1-humidity');
var day2humidity = $('.day-2-humidity');
var day3humidity = $('.day-3-humidity');
var day4humidity = $('.day-4-humidity');
var day5humidity = $('.day-5-humidity');

//Array for cities that have been searched
var cityArray = [];

// Function that will run once search button is clicked. API call will be made based on the user input
function getWeatherData(event){

    //Getting the user input and integrating it to an API URL
    if(event.target.dataset.input === "#city-state"){
      var input = event.target.dataset.input;
      var inputText = $(input).val().split(" ").join("");
    } else if(event.target.classList.contains('search-history') === true){
      var inputText = event.target.textContent;
    }

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputText + '&appid=9609bbba160c117307dfce14de7020ea';

    //Fetch data from API URL
    fetch(requestUrl)
     .then(function (response) {
      if(response.status === 200){
        weatherDisplay.css("visibility", "visible");
      }
      return response.json();
    })
  .then(function (data) {

    //Assigning variables for various weather conditions
    var city = data.name;
    var weather = data.weather[0].description;
    var temperature = data.main.temp;
    temperature = Number(temperature);
    temperature = (temperature - 273.15)*9/5+32; 
    temperature = Math.trunc(temperature);
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var date = moment().format('l');

    //Assigning text for different weather conditions
    currentCityDate.text(city + ' ' + date);
    currentWeather.text('Current Weather: ' + weather);
    currentTemp.text('Temp: ' + temperature + " °F");
    currentWind.text('Wind: ' + windSpeed + "mph");
    currentHumidity.text('Humidity: ' + humidity + '%');

    //Creating new button for the city searched
    if(cityArray.includes(city) === false){
      var newButton = document.createElement("button");
      newButton.classList.add('search-history', 'btn', 'btn-outline-primary');
      newButton.setAttribute('type','button');
      newButton.textContent = city;
      newCityButton.append(newButton);
      cityArray.push(city);
      console.log(newButton);
      $('.search-history').on('click', getWeatherData);
    };

    //Call 5 day weather forecast function
    forecast(inputText);
  });
};

//function for getting 5 day weather forecast 
function forecast(input){
  console.log(input);
  var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=9609bbba160c117307dfce14de7020ea';

    fetch(requestURL)
     .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {

      console.log(data);

      day1date.text(moment().add(1, 'd').format('l'));
      day2date.text(moment().add(2, 'd').format('l'));
      day3date.text(moment().add(3, 'd').format('l'));
      day4date.text(moment().add(4, 'd').format('l'));
      day5date.text(moment().add(5, 'd').format('l'));

      day1weather.text(data.list[4].weather[0].description);
      day2weather.text(data.list[12].weather[0].description);
      day3weather.text(data.list[20].weather[0].description);
      day4weather.text(data.list[28].weather[0].description);
      day5weather.text(data.list[36].weather[0].description);

      var temp1 = data.list[4].main.temp;
      temp1 = (Number(temp1) - 273.15)*9/5+32;
      temp1 = Math.trunc(temp1);
      day1temp.text('Temperature: ' + temp1 + ' °F');

      var temp2 = data.list[12].main.temp;
      temp2 = (Number(temp2) - 273.15)*9/5+32;
      temp2 = Math.trunc(temp2);
      day2temp.text('Temperature: ' + temp2 + ' °F');

      var temp3 = data.list[20].main.temp;
      temp3 = (Number(temp3) - 273.15)*9/5+32;
      temp3 = Math.trunc(temp3);
      day3temp.text('Temperature: ' + temp3 + ' °F');

      var temp4 = data.list[28].main.temp;
      temp4 = (Number(temp4) - 273.15)*9/5+32;
      temp4 = Math.trunc(temp4);
      day4temp.text('Temperature: ' + temp4 + ' °F');

      var temp5 = data.list[36].main.temp;
      temp5 = (Number(temp5) - 273.15)*9/5+32;
      temp5 = Math.trunc(temp5);
      day5temp.text('Temperature: ' + temp5 + ' °F');

      day1wind.text('Wind Speed: ' + data.list[4].wind.speed + 'mph');
      day2wind.text('Wind Speed: ' + data.list[12].wind.speed + 'mph');
      day3wind.text('Wind Speed: ' + data.list[20].wind.speed + 'mph');
      day4wind.text('Wind Speed: ' + data.list[28].wind.speed + 'mph');
      day5wind.text('Wind Speed: ' + data.list[36].wind.speed + 'mph');

      day1humidity.text('Humidity: ' + data.list[0].main.humidity + '%');
      day2humidity.text('Humidity: ' + data.list[12].main.humidity + '%');
      day3humidity.text('Humidity: ' + data.list[20].main.humidity + '%');
      day4humidity.text('Humidity: ' + data.list[28].main.humidity + '%');
      day5humidity.text('Humidity: ' + data.list[36].main.humidity + '%');
  })
};

submitBtn.on('click', getWeatherData);