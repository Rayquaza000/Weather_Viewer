//Get the required html elements using DOM manipulation
const searchbar=document.getElementById("searchbar");
const search_button=document.getElementById("search_button")
const current_location_button=document.getElementById("current_location_button");


const today_date_data=document.getElementById("date_data");
const today_temp_data=document.getElementById("temp_data");
const today_wind_data=document.getElementById("wind_data");
const today_humidity_data=document.getElementById("humidity_data");
const today_location_data=document.getElementById("location_data");

const day_plus_one_date=document.getElementById("day_plus_one_date");
day_plus_one_date.style.fontWeight="bold";
const day_plus_one_temp_data=document.getElementById("day_plus_one_temp_data");
const day_plus_one_wind_data=document.getElementById("day_plus_one_wind_data");
const day_plus_one_humidity_data=document.getElementById("day_plus_one_humidity_data");

const day_plus_two_date=document.getElementById("day_plus_two_date");
day_plus_two_date.style.fontWeight="bold";
const day_plus_two_temp_data=document.getElementById("day_plus_two_temp_data");
const day_plus_two_wind_data=document.getElementById("day_plus_two_wind_data");
const day_plus_two_humidity_data=document.getElementById("day_plus_two_humidity_data");

const day_plus_three_date=document.getElementById("day_plus_three_date");
day_plus_three_date.style.fontWeight="bold";
const day_plus_three_temp_data=document.getElementById("day_plus_three_temp_data");
const day_plus_three_wind_data=document.getElementById("day_plus_three_wind_data");
const day_plus_three_humidity_data=document.getElementById("day_plus_three_humidity_data");

const day_plus_four_date=document.getElementById("day_plus_four_date");
day_plus_four_date.style.fontWeight="bold";
const day_plus_four_temp_data=document.getElementById("day_plus_four_temp_data");
const day_plus_four_wind_data=document.getElementById("day_plus_four_wind_data");
const day_plus_four_humidity_data=document.getElementById("day_plus_four_humidity_data");

const day_plus_five_date=document.getElementById("day_plus_five_date");
day_plus_five_date.style.fontWeight="bold";
const day_plus_five_temp_data=document.getElementById("day_plus_five_temp_data");
const day_plus_five_wind_data=document.getElementById("day_plus_five_wind_data");
const day_plus_five_humidity_data=document.getElementById("day_plus_five_humidity_data");

//Variables to store co-ordinates of the current location and city name from searchbar
let latitude,longitude,latitude1,longitude1;
let city;

//get todays date
let date=new Date();
//set date for each block
today_date_data.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_one_date.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_two_date.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_three_date.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_four_date.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_five_date.textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

//check if browser has geolocation api
if (navigator.geolocation) {
    //get current position using geolocation api and execute success function if fetched current position else error
    navigator.geolocation.getCurrentPosition(success, error);
} 
else { 
    console.log("Geolocation is not supported by this browser.");
}

//function to execute when fetched geolocation
async function success(position) {
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    
    //get the current location city from co-ordinates using geocode api
    const geocoding_api_url="https://geocode.maps.co/reverse?lat="+latitude+"&lon="+longitude+"&api_key=685aad2d95329579905593yol7954d4";
    await fetch(geocoding_api_url)
    .then((response) => response.json())
    .then((data) => {
        city = data.address.city;
        console.log("Current city:", city);
        searchbar.value=city;
        //fetch weather data of the selected city
        fetch("http://api.weatherapi.com/v1/forecast.json?key=54dde498fbd947c6b1765535252406&q="+city+"&days=6")
        .then((response1)=>response1.json())
        .then((data1)=>{

            //extract data from the api request and set all the field's data accordingly
             let temperature1=data1.current.temp_c;
             today_location_data.textContent=city;
             today_temp_data.textContent=temperature1+"\u00B0 C";
             today_wind_data.textContent=data1.current.wind_mph+" mph";
             today_humidity_data.textContent=data1.current.humidity+"%";

            day_plus_one_temp_data.textContent=data1.forecast.forecastday[0].day.avgtemp_c;
            day_plus_one_humidity_data.textContent=data1.forecast.forecastday[0].day.avghumidity;
            day_plus_one_wind_data.textContent=data1.forecast.forecastday[0].day.maxwind_mph;

            day_plus_two_temp_data.textContent=data1.forecast.forecastday[1].day.avgtemp_c;
            day_plus_two_humidity_data.textContent=data1.forecast.forecastday[1].day.avghumidity;
            day_plus_two_wind_data.textContent=data1.forecast.forecastday[1].day.maxwind_mph;

            day_plus_three_temp_data.textContent=data1.forecast.forecastday[2].day.avgtemp_c;
            day_plus_three_humidity_data.textContent=data1.forecast.forecastday[2].day.avghumidity;
            day_plus_three_wind_data.textContent=data1.forecast.forecastday[2].day.maxwind_mph;

            day_plus_four_temp_data.textContent=data1.forecast.forecastday[3].day.avgtemp_c;
            day_plus_four_humidity_data.textContent=data1.forecast.forecastday[3].day.avghumidity;
            day_plus_four_wind_data.textContent=data1.forecast.forecastday[3].day.maxwind_mph;

            day_plus_five_temp_data.textContent=data1.forecast.forecastday[4].day.avgtemp_c;
            day_plus_five_humidity_data.textContent=data1.forecast.forecastday[4].day.avghumidity;
            day_plus_five_wind_data.textContent=data1.forecast.forecastday[4].day.maxwind_mph;
            console.log(data1.forecast.forecastday[0].day);
        })
        .catch((error)=>{console.log(error)});
    })
    .catch((error) => {
        console.error("Error during geocoding:", error);
    });
    


}

function error() {
  alert("Sorry, no position available.");
}

//when the searched button is clicked display the appropriate data in the appropriate fields
search_button.addEventListener("click",function(){
    //fetch weather data according to the searchbar value(i.e city) when searched button is clicked
    fetch("http://api.weatherapi.com/v1/forecast.json?key=54dde498fbd947c6b1765535252406&q="+searchbar.value+"&days=6")
    .then((response)=>response.json())
    .then((data)=>{
        // after fetching data display it in the appropriate fields
        today_location_data.textContent=searchbar.value;
        today_temp_data.textContent=data.current.temp_c+"\u00B0 C";
        today_wind_data.textContent=data.current.wind_mph+" mph";
        today_humidity_data.textContent=data.current.humidity+"%";

        day_plus_one_temp_data.textContent=data.forecast.forecastday[0].day.avgtemp_c;
        day_plus_one_humidity_data.textContent=data.forecast.forecastday[0].day.avghumidity;
        day_plus_one_wind_data.textContent=data.forecast.forecastday[0].day.maxwind_mph;

        day_plus_two_temp_data.textContent=data.forecast.forecastday[1].day.avgtemp_c;
        day_plus_two_humidity_data.textContent=data.forecast.forecastday[1].day.avghumidity;
        day_plus_two_wind_data.textContent=data.forecast.forecastday[1].day.maxwind_mph;

        day_plus_three_temp_data.textContent=data.forecast.forecastday[2].day.avgtemp_c;
        day_plus_three_humidity_data.textContent=data.forecast.forecastday[2].day.avghumidity;
        day_plus_three_wind_data.textContent=data.forecast.forecastday[2].day.maxwind_mph;

        day_plus_four_temp_data.textContent=data.forecast.forecastday[3].day.avgtemp_c;
        day_plus_four_humidity_data.textContent=data.forecast.forecastday[3].day.avghumidity;
        day_plus_four_wind_data.textContent=data.forecast.forecastday[3].day.maxwind_mph;

        day_plus_five_temp_data.textContent=data.forecast.forecastday[4].day.avgtemp_c;
        day_plus_five_humidity_data.textContent=data.forecast.forecastday[4].day.avghumidity;
        day_plus_five_wind_data.textContent=data.forecast.forecastday[4].day.maxwind_mph;
        })
        .catch((error)=>{alert("Weather forecast for this location is not available")});

    });

async function success1(position) {
    latitude1=position.coords.latitude;
    longitude1=position.coords.longitude;

    const geocoding_api_url="https://geocode.maps.co/reverse?lat="+latitude1+"&lon="+longitude1+"&api_key=685aad2d95329579905593yol7954d4";
    await fetch(geocoding_api_url)
    .then((response) => response.json())
    .then((data) => {
        city = data.address.city; // The exact path to the city may vary by API
        console.log("Current city:", city);
        searchbar.value=city;
        fetch("http://api.weatherapi.com/v1/forecast.json?key=54dde498fbd947c6b1765535252406&q="+city+"&days=6")
        .then((response1)=>response1.json())
        .then((data1)=>{
             let temperature1=data1.current.temp_c;
             today_location_data.textContent=city;
             today_temp_data.textContent=temperature1+"\u00B0 C";
             today_wind_data.textContent=data1.current.wind_mph+" mph";
             today_humidity_data.textContent=data1.current.humidity+"%";

            day_plus_one_temp_data.textContent=data1.forecast.forecastday[0].day.avgtemp_c;
            day_plus_one_humidity_data.textContent=data1.forecast.forecastday[0].day.avghumidity;
            day_plus_one_wind_data.textContent=data1.forecast.forecastday[0].day.maxwind_mph;

            day_plus_two_temp_data.textContent=data1.forecast.forecastday[1].day.avgtemp_c;
            day_plus_two_humidity_data.textContent=data1.forecast.forecastday[1].day.avghumidity;
            day_plus_two_wind_data.textContent=data1.forecast.forecastday[1].day.maxwind_mph;

            day_plus_three_temp_data.textContent=data1.forecast.forecastday[2].day.avgtemp_c;
            day_plus_three_humidity_data.textContent=data1.forecast.forecastday[2].day.avghumidity;
            day_plus_three_wind_data.textContent=data1.forecast.forecastday[2].day.maxwind_mph;

            day_plus_four_temp_data.textContent=data1.forecast.forecastday[3].day.avgtemp_c;
            day_plus_four_humidity_data.textContent=data1.forecast.forecastday[3].day.avghumidity;
            day_plus_four_wind_data.textContent=data1.forecast.forecastday[3].day.maxwind_mph;

            day_plus_five_temp_data.textContent=data1.forecast.forecastday[4].day.avgtemp_c;
            day_plus_five_humidity_data.textContent=data1.forecast.forecastday[4].day.avghumidity;
            day_plus_five_wind_data.textContent=data1.forecast.forecastday[4].day.maxwind_mph;
            console.log(data1.forecast.forecastday[0].day);
        })
        .catch((error)=>{console.log(error)});
    })
    .catch((error) => {
        console.error("Error during geocoding:", error);
    });
    


}

function error1() {
  alert("Sorry, no position available.");
}

//when clicked on this button get the current location of user and display data accordingly
current_location_button.addEventListener("click",function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success1, error1);
    } 
    else { 
        console.log("Geolocation is not supported by this browser.");
    }
});
