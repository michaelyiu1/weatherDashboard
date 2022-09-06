// creating variables for buttons
var submitBtn = $('.btn');



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
      return response.json();
     console.log(response);
    })
  .then(function (data) {
    console.log(data);
    console.log(data.weather[0].description);

    var city = data.name;
    var weather = data.weather[0].main;
    var temperature = data.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    console.log(city);
  });
}

submitBtn.on('click', getWeatherData);
