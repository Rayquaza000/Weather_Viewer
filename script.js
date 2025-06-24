const searchbar=document.getElementById("searchbar");
const today_date_data=document.getElementById("date_data");
const today_temp_data=document.getElementById("temp_data");
const today_wind_data=document.getElementById("wind_data");
const today_humidity_data=document.getElementById("humidity_data");
const today_location_data=document.getElementById("location_data");

// const current_day_plus_one_div=document.getElementById("current_day_plus_one_div");
// const current_day_plus_two_div=document.getElementById("current_day_plus_two_div");
// const current_day_plus_three_div=document.getElementById("current_day_plus_three_div");
// const current_day_plus_four_div=document.getElementById("current_day_plus_four_div");
// const current_day_plus_five_div=document.getElementById("current_day_plus_five_div");
// const current_day_plus_six_div=document.getElementById("current_day_plus_six_div");

const day_plus_one_date=document.getElementById("day_plus_one_date");
const day_plus_one_temp_data=document.getElementById("day_plus_one_temp_data");
const day_plus_one_wind_data=document.getElementById("day_plus_one_wind_data");
const day_plus_one_humidity_data=document.getElementById("day_plus_one_humidity_data");

const day_plus_two_date=document.getElementById("day_plus_two_date");
const day_plus_two_temp_data=document.getElementById("day_plus_two_temp_data");
const day_plus_two_wind_data=document.getElementById("day_plus_two_wind_data");
const day_plus_two_humidity_data=document.getElementById("day_plus_two_humidity_data");

const day_plus_three_date=document.getElementById("day_plus_three_date");
const day_plus_three_temp_data=document.getElementById("day_plus_three_temp_data");
const day_plus_three_wind_data=document.getElementById("day_plus_three_wind_data");
const day_plus_three_humidity_data=document.getElementById("day_plus_three_humidity_data");

const day_plus_four_date=document.getElementById("day_plus_four_date");
const day_plus_four_temp_data=document.getElementById("day_plus_four_temp_data");
const day_plus_four_wind_data=document.getElementById("day_plus_four_wind_data");
const day_plus_four_humidity_data=document.getElementById("day_plus_four_humidity_data");

const day_plus_five_date=document.getElementById("day_plus_five_date");
const day_plus_five_temp_data=document.getElementById("day_plus_five_temp_data");
const day_plus_five_wind_data=document.getElementById("day_plus_five_wind_data");
const day_plus_five_humidity_data=document.getElementById("day_plus_five_humidity_data");

let latitude,longitude;
let city;
let date=new Date();
today_date_data.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_one_date.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_two_date.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_three_date.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_four_date.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
date.setDate(date.getDate()+1);
day_plus_five_date.textContent=date.getDate()+"/ "+(date.getMonth()+1)+"/ "+date.getFullYear();
// if ("geolocation" in navigator) {
//         // Geolocation is available
//     } else {
//         // Geolocation is NOT available in this browser
//         console.log("Geolocation is not supported by your browser.");
//     }

if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(success, error);
} 
else { 
    console.log("Geolocation is not supported by this browser.");
}
async function success(position) {
    //console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;

    const geocoding_api_url="https://geocode.maps.co/reverse?lat="+latitude+"&lon="+longitude+"&api_key=685aad2d95329579905593yol7954d4";
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

function error() {
  alert("Sorry, no position available.");
}


