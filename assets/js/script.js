var date = moment().format("l");
$("#date").html(date);
var search = document.querySelector("#search-btn");
var cities = []; 
    var information = document.querySelector("#info");

    //query selectors for 5 day forcast 
    var dayOne = document.querySelector("#one");
    var dayTwo = document.querySelector("#two");
    var dayThree = document.querySelector("#three");
    var dayFour = document.querySelector("#four");
    var dayFive = document.querySelector("#five");
    //dates for five day forcast
    // var dateOne = moment().add(1,'days').calendar();
    // $("#date1").html(dateOne)
   

//grabs city and stores it in local storage

function newCity(){
    var name = document.querySelector("#search-bar").value;

getCity(name);
localStorage.setItem("cities", JSON.stringify(name));
}
// var city =$("")
//gets city name and creates API for the city
var getCity = function(city) {

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
//icon display
var icon = data.weather[0].icon;
var iconLink = "http://openweathermap.org/img/w/" + icon + ".png";
$('#wicon').attr('src', iconLink);


//displaying content

temp.innerHTML = "temperture: " + data.main.temp + " F" ;
hum.innerHTML = "humidity: " + data.main.humidity + "%";
wind.innerHTML = "wind speed: " + data.wind.speed + " MPH";

//fetch UV index Link
var UVLink = "http://api.openweathermap.org/data/2.5/uvi?lat="+ data.coord.lat+ "&lon="+ data.coord.lon+"&appid=105446e2c6e979033bfda6375ab0f93c"
fetch(UVLink)
      .then(function(response) {
        // request was successful
        if (response.ok) {
            //run UVI scale and display uvi rating
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

      //five day forecast API
      var weekForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&units=imperial&appid=105446e2c6e979033bfda6375ab0f93c"
      fetch(weekForecast)
      .then(function(response) {
        // request was successful
        if (response.ok) {
            //call display function
          response.json().then(function(data) {
              var value = (data.city.timezone).val; //this retrieves the unix timestamp
              var date1 = (moment(value).add(1, 'days').calendar());
              var date2 = (moment(value).add(2, 'days').calendar());
              var date3 = (moment(value).add(3, 'days').calendar());
              var date4 = (moment(value).add(4, 'days').calendar());
              var date5 = (moment(value).add(5, 'days').calendar());
            $("#dateOne").html(date1)
            $("#date2").html(date2)
            $("#date3").html(date3)
            $("#date4").html(date4)
            $("#date5").html(date5)

            //icon display
            var icon1 = data.list[1].weather[0].icon;
var iconLink1 = "http://openweathermap.org/img/w/" + icon1 + ".png";
$('#icon1').attr('src', iconLink1);
//display icon 2

var icon2 = data.list[2].weather[0].icon;
var iconLink2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
$('#icon2').attr('src', iconLink2);
//
var icon3= data.list[3].weather[0].icon;

var iconLink3 = "http://openweathermap.org/img/w/" + icon3 + ".png";
$('#icon3').attr('src', iconLink3);
var icon4 = data.list[4].weather[0].icon;
var iconLink4 = "http://openweathermap.org/img/w/" + icon4 + ".png";
$('#icon4').attr('src', iconLink4);
var icon5 =data.list[5].weather[0].icon;
var iconLink5 = "http://openweathermap.org/img/w/" + icon5 + ".png";
$('#icon5').attr('src', iconLink5);

            
            first.innerHTML="temp: " + data.list[1].main.temp + " F";
            second.innerHTML="temp: " +data.list[2].main.temp + " F";
            third.innerHTML="temp: " +data.list[3].main.temp + " F";
            fourth.innerHTML="temp: " +data.list[4].main.temp + " F";
            fifth.innerHTML="temp: " +data.list[5].main.temp + " F";
            firsth.innerHTML="humidity: " +data.list[1].main.humidity + " %";
            secondh.innerHTML="humidity: " +data.list[2].main.humidity + " %";
            thirdh.innerHTML="humidity: " +data.list[3].main.humidity + " %";
            fourthh.innerHTML="humidity: " +data.list[4].main.humidity + " %";
            fifthh.innerHTML="humidity: " +data.list[5].main.humidity + " %";
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
dayOne.appendChild(first);
dayTwo.appendChild(second);
dayThree.appendChild(third);
dayFour.appendChild(fourth);
dayFive.appendChild(fifth);
dayOne.appendChild(firsth);
dayTwo.appendChild(secondh);
dayThree.appendChild(thirdh);
dayFour.appendChild(fourthh);
dayFive.appendChild(fifthh);

  };
  // creating elements for the information outside to stop repition
  var temp = document.createElement("p");
  var hum = document.createElement("p");
  var wind = document.createElement("p");
  var uv  = document.createElement("p");

// elements for forecast
  var first = document.createElement("p");
  var second = document.createElement("p");
  var third = document.createElement("p");
  var fourth  = document.createElement("p");
  var fifth  = document.createElement("p");
  var firsth= document.createElement("p");
  var secondh = document.createElement("p");
  var thirdh = document.createElement("p");
  var fourthh  = document.createElement("p");
  var fifthh  = document.createElement("p");















search.addEventListener("click", newCity);
