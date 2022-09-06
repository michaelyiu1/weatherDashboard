// creating variables for button
var submitBtn = $('.btn');
var currentWeather = $('.current-weather');
var currentTemp = $('.current-temp');
var currentHumidity = $('.current-humidity');
var currentWind = $('.current-wind');
var currentUV = $('.current-uv');
var currentCityDate = $('.current-city-date');
console.log(currentCityDate);



// Function that will run once search button is clicked. API call will be made based on the user input
function getWeatherData(event){

    var input = event.target.dataset.input;
    console.log(input);
    var inputText = $(input).val();
    console.log(inputText);

    inputText = inputText.split(" ").join("");
    console.log(inputText);

    var coordinateRequestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputText + '&appid=9609bbba160c117307dfce14de7020ea';

    fetch(coordinateRequestUrl)
     .then(function (response) {
      console.log(response.status);\
      return response.json();
    })
  .then(function (data) {

    if(data.cod === 200){
        var newButton = document.createElement("button");
      }

    var city = data.name;
    var weather = data.weather[0].description;
    var temperature = data.main.temp;
    temperature = Number(temperature);
    temperature = (temperature - 273.15)*9/5+32; 
    temperature = Math.trunc(temperature);
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;

    var date = moment().format('l');


    currentCityDate.text(city + ' ' + date);
    currentWeather.text('Current Weather: ' + weather);
    currentTemp.text('Temp: ' + temperature + " °F");
    currentWind.text('Wind: ' + windSpeed + "mph");
    currentHumidity.text('Humidity: ' + humidity + '%');


  });
}

submitBtn.on('click', getWeatherData);
