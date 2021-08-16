// getting the search bar to work
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('btn');
const searchedCities = document.querySelector('.searchedCities');
var citylist = [];

searchBtn.addEventListener('click', function() {
    if(searchInput.value){
        const searchedCity = document.createElement('button');
        searchedCity.classList.add('searchedcity');
        searchedCity.textContent = searchInput.value;
        citylist.push(searchInput.value);
        searchedCities.appendChild(searchedCity);
        console.log(citylist);
        getCorr(searchInput.value);
        saveTask();
        
        console.log(searchedCity.textContent);
        searchedCity.addEventListener('click', function(event){
            event.preventDefault();
            searchInput.value = searchedCity.textContent ;
            console.log(searchInput.value);
            
        })
        
    }
   
})
var saveTask = function(){
    localStorage.setItem('citylist', JSON.stringify(citylist));
}

var loadTask = function(){
    var savedTask = localStorage.getItem("citylist");
    
    if(!savedTask) {
        return false;
    }
    
    console.log("Saved tasks found!");
    savedTask = JSON.parse(savedTask);
    
    for (var i = 0; i < savedTask.length; ++i){
        const searchedCity = document.createElement('button');
        searchedCity.classList.add('searchedcity');
        searchedCity.innerText = savedTask[i];
        searchedCities.appendChild(searchedCity);
        searchedCity.addEventListener('click', function(event){
            event.preventDefault();
            searchInput.value = searchedCity.textContent ;
            
        })
        
    }
    
}
loadTask();
console.log(typeof(searchInput.value));

// API Key = ce9ddbed2a5483d36efd8e6483c1ffa6;
//getting the lat and lon for every city

var getCorr = function(city){
    const baseUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
    const API = '&limit=1&appid=ce9ddbed2a5483d36efd8e6483c1ffa6';
    fetch(baseUrl + city + API)
    .then(function(response) {
        response.json()
        .then(function(data){
            
            getCurrent(data[0].lat, data[0].lon)
            getDaily(data[0].lat, data[0].lon)
        })
    })
}
//getCorr('Houston');

var getCurrent = function(lat, lon){
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    const latt = 'lat=' + lat;
    const lonn = '&lon=' + lon;
    const rest = '&exclude=minutely,hourly,alert&units=imperial&appid=ce9ddbed2a5483d36efd8e6483c1ffa6';
    fetch(baseUrl + latt + lonn + rest)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data.current);
            showCurrent(data.current);
            showCurrentDate(data.current.dt);
        })
    })
}

var showCurrentDate = function(date){
    const currentDate = document.querySelector(".date");
    var dateString = moment.unix(date).format("MM/DD/YYYY");
    currentDate.innerText = dateString;
}

var showCurrent = function(data){
    const cityName = document.querySelector(".city");
    cityName.innerText = searchInput.value;
    //cityName.innerText = 'Houston';
    const img = document.querySelector('.icon');
    const imgUrl = ' http://openweathermap.org/img/wn/';
    img.src = imgUrl+data.weather[0].icon+'@2x.png';
    
    const currentTemp = document.querySelector(".temp");
    currentTemp.innerText = "Temp: " + data.temp + " F";
    const currentWind = document.querySelector(".wind");
    currentWind.innerText = "Wind: " + data.wind_speed + " MPH";
    const currentHumidity = document.querySelector(".humidity");
    currentHumidity.innerText = "Humidity: " + data.humidity + "%";
    const currentUV = document.querySelector(".uv");
    currentUV.innerText = "UV Index: " + data.uvi;
    searchInput.value = '';
     
}

var getDaily = function(lat, lon) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    const latt = 'lat=' + lat;
    const lonn = '&lon=' + lon;
    const rest = '&exclude=minutely,hourly,current,alert&units=imperial&appid=ce9ddbed2a5483d36efd8e6483c1ffa6';
    fetch(baseUrl + latt + lonn + rest)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data.daily);
            showForcast(data.daily);
        })
    })
}

const pagecontainer = document.querySelector('.forecast');
var showForcast = function(data) {
    pagecontainer.innerHTML = " ";
    for (var i = 1; i < data.length - 2; ++i){
        console.log(data[i])
        const eachDay = document.createElement("div");
        eachDay.classList.add("card", "col-lg-2", "col-9");

        const date = document.createElement("h4");
        date.classList.add("forcastDate");
        var dateString = moment.unix(data[i].dt).format("MM/DD/YYYY");
        date.textContent = dateString;

        //console.log(data[i].weather[0].icon);
        //img forcast 
        

        //temp forcast
        const temp = document.createElement('div');
        temp.classList.add("forcast-detail", "temp");
        temp.textContent = "Temp: " + data[i].temp.day + "F";
        //wind forcast
        const wind = document.createElement('div');
        wind.classList.add("forcast-detail", 'wind');
        wind.textContent = "Wind: " + data[i].wind_speed + " MPH";
        //humidity forcast
        const humidity = document.createElement('div');
        humidity.classList.add("forcast-detail", "humidity");
        humidity.textContent = "Humidity: " + data[i].humidity + "%";

        eachDay.appendChild(date);
        //eachDay.appendChild(img);
        eachDay.appendChild(temp);
        eachDay.appendChild(wind);
        eachDay.appendChild(humidity);
        pagecontainer.appendChild(eachDay);
    }
}
