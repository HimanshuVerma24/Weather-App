const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector("input");
const API_KEY = "ca1dc445a89c5d82bf75cd48a3be0e64";
const locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e =>{
    // If User Pressed Enter Button And Input Value Is Not Empty
    if(e.key == "Enter" && inputField.value != ""){
        // console.log("Hello")
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if (navigator.geolocation) { //Your Browser Must Support For Geolocation API
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }else{
        alert("Your Browser Not Support Geolocation API 🙄");
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords; // It Is Used To Get The Lat,Lon Of The User Device In Coords Object
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    fetchData();
}


function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    // console.log(city);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting Weather Details...";
    infoTxt.classList.add("pending");
    inputPart.inne
    // Getting API Response And Returning It With Parsing Into Parsing Into JS Object And In Another.
    // Then Function Calling weatherDetails Function And Passing API Result As An Argument.
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if (info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} Isn't A Valid City Name 😑`;
     }else{
        // Finally Get Required Property Value From The Object.
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        // Svg Files Changes According To Weather Code
        if(id == 800){
            wIcon.src = "./Weather-Icons/clear.svg";
        }else if(id >= 200 && id <=232){
            wIcon.src = "./Weather-Icons/storm.svg";
        }else if(id >= 600 && id <=622){
            wIcon.src = "./Weather-Icons/snow.svg";
        }else if(id >= 701 && id <=781){
            wIcon.src = "./Weather-Icons/haze.svg";
        }else if(id >= 801 && id <=804){
            wIcon.src = "./Weather-Icons/cloud.svg";
        }else if((id >= 300 && id <=321) || (id >= 500 && id <= 531)){
            wIcon.src = "./Weather-Icons/rain.svg";
        }

        // And We Pass These Fetch Value In HTML.
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        }
    console.log(info);
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
















