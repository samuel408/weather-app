var date = moment().format("l");
$("#date").html(date);
var search = document.querySelector("#search-btn");
var cities = []; 
    var information = document.querySelector("#info");
//grabs city and stores it in local storage
function newCity(){
    var name = document.querySelector("#search-bar").value;
getCity(name);
localStorage.setItem("cities", JSON.stringify(name));
}
// var city =$("")
//gets city name and creates API for the city
var getCity = function( city) {

    // format the github api url
    
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=105446e2c6e979033bfda6375ab0f93c';
  console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
            //call display function
          response.json().then(function(data) {
            display(data, city);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      });

  };

//display what was grabbed by API
  var display = function(data, city) {
        //changes  array froms strings back to nomral data types
        cities = JSON.parse(localStorage.getItem("cities"));
 
    var cityName = document.querySelector("#city-name");
cityName.innerHTML = data.name ;
    // check if api returned any repos


temp.innerHTML = "temperture: " + data.main.temp + " F" ;
hum.innerHTML = "humidity: " + data.main.humidity + "%";
wind.innerHTML = "wind speed: " + data.wind.speed + " MPH";

//fetch UV index Link
var UVLink = "http://api.openweathermap.org/data/2.5/uvi?lat="+ data.coord.lat+ "&lon="+ data.coord.lon+"&appid=105446e2c6e979033bfda6375ab0f93c"
fetch(UVLink)
      .then(function(response) {
        // request was successful
        if (response.ok) {
            //call display function
          response.json().then(function(data) {
            uv.innerHTML = "UV Index: " + data.value;
            // uvi scale indicator
        if (data.value < 3){
          uv.setAttribute('class', 'text-success')
          
        }
        else if (data.value < 6 && data.value >= 3){
          uv.setAttribute('class', 'text-warning')


        }
        else{
          uv.setAttribute('class', 'text-danger')

        }

          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      });

information.appendChild(temp);
information.appendChild(hum);
information.appendChild(wind);
information.appendChild(uv);

   
  };
  // creating elements for the information outside to stop repition
  var temp = document.createElement("p");
  var hum = document.createElement("p");
  var wind = document.createElement("p");
  var uv  = document.createElement("p");














search.addEventListener("click", newCity);
