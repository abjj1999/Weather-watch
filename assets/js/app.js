let weather = {
    
    
}
fetchWeather = function(city) {
    apiKey = "ce9ddbed2a5483d36efd8e6483c1ffa6",
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + city +
    "&units=imperial&appid=" + apiKey
    )
    .then(function(response) {
        response.json()
        .then(function(data){
            displayWeather(data);
        });
    });
}
var displayWeather= function(data) {
    const  name  = data.name;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp  = data.main.temp;
    const humidity = data.main.humidity;
    const speed  = data.wind.speed;
    into_page(name, icon, description,temp, humidity, speed);
}

var into_page = function(name, icon, description, temp, humidity, speed){
    $(".city").text(name);
    $(".icon").text(icon);
    $(".discription").text(description);
    $(".temp").text(temp, " °F");
    $(".humidity").text(humidity);
    $(".wind").text(speed);
}

$(".search-btn").on("click", function(){
    var inputText =  $(".search-bar").val();
    fetchWeather(inputText);
    console.log(inputText);

})

