let temp = document.getElementById("temp");
let city = document.getElementById("city");
let date = document.getElementById("date");
let description = document.getElementById("description");

let country = document.getElementById("country");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let visible = document.getElementById("visible");


var inputTxt = document.getElementById("inputTxt");

inputTxt.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("btn").click();
    }
})



function search() {
    let inputTxt = document.getElementById("inputTxt").value;
    console.log(inputTxt);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + inputTxt + "&appid=b6060315ce258b2b35006a8a6474facd&units=metric";

    getApiData(url);
    document.getElementById("inputTxt").value="";


    let lft = document.getElementById("lft");
        lft.style.display="block"
    // inputTxt="";
}



function getApiData(url) {
    fetch(url).then((res) => { return res.json(); }).then((data) => { return founddata(data) }).catch((err) => console.log(err));
}


function founddata(data) {
    if (data.cod === 200) {

        console.log(data);
        city.innerHTML = data.name;
        description.innerHTML = data.weather[0].description;
        temp.innerHTML = Math.floor(data.main.temp) + `°c`;



        wind.style.display = "flex";
        humidity.style.display = "flex";
        pressure.style.display = "flex";
        visible.style.display = "flex";





        const id = data.weather[0].id;

        let lft = document.getElementById("lft");
        if (id == 800) {

            lft.style.backgroundImage = "url('Images/clear.jpg')";
        } else if (id >= 200 && id <= 232) {

            lft.style.backgroundImage = "url('Images/storm.jpg')";

        } else if (id >= 600 && id <= 622) {

            lft.style.backgroundImage = "url('Images/snow.jpg')";

        } else if (id >= 701 && id <= 781) {

            lft.style.backgroundImage = "url('Images/haze.jpg')";

        } else if (id >= 801 && id <= 804) {

            lft.style.backgroundImage = "url('Images/cloud.jpg')";

        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {

            lft.style.backgroundImage = "url('Images/rain.jpg')";

        }
        temp.style.display = "flex";
        document.getElementById("des").style.display = "flex";

        var img = document.getElementById("pic");
        img.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        img.id = "pic";

        country.innerHTML = data.sys.country;
        wind.innerHTML = data.wind.speed+ ` Km/H`;
        humidity.innerHTML = data.main.humidity+ ` RH`;
        pressure.innerHTML = data.main.pressure+ ` PA`;
        visible.innerHTML = data.visibility+` M`;



    }
    else {
        console.log("Error");
        city.innerHTML = data.message;
        temp.style.display = "none";
        document.getElementById("des").style.display = "none";


        country.style.display = "none";
        wind.style.display = "none";
        humidity.style.display = "none";
        pressure.style.display = "none";
        visible.style.display = "none";
    }


}