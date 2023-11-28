document.getElementById("button").addEventListener("click", currentLocation);
document.getElementById("mexico").addEventListener("click", currentLocation);
document.getElementById("france").addEventListener("click", currentLocation);
document.getElementById("brazil").addEventListener("click", currentLocation);
document.getElementById("italy").addEventListener("click", currentLocation);
document.getElementById("skorea").addEventListener("click", currentLocation);

//geolocation 

function currentLocation() {
    let latitude, longitude;
    if (this.id === "mexico") {
        latitude = 19.56652;
        longitude = -101.70683;
        document.getElementById("titlelocation").innerHTML = "Michoacán de Ocampo, Mexico";
    } else if (this.id === "france"){
        latitude = 49.0754;
        longitude = 0.48937;
        document.getElementById("titlelocation").innerHTML = "Eure, France";
    } else if (this.id === "brazil"){
        latitude = -4.96095;
        longitude = -45.27442;
        document.getElementById("titlelocation").innerHTML = "Maranhão, Brazil";
    } else if (this.id === "italy"){
        latitude = 45.80804;
        longitude = 9.08518;
        document.getElementById("titlelocation").innerHTML = "Como, Italy";
    } else if (this.id === "skorea"){
        latitude = 37.45646;
        longitude = 126.70515;
        document.getElementById("titlelocation").innerHTML = "Incheon, South Korea";
    }
    setLocationFunc(latitude, longitude)
}


function setLocationFunc(lat,long){
    const todayurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&date=today`
    const tomorrowurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&date=tomorrow`
    fetch(todayurl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('fsunrise').value = data.results.sunrise;
        document.getElementById('fsunset').value = data.results.sunset;
        document.getElementById('fdawn').value = data.results.dawn;
        document.getElementById('fdusk').value = data.results.dusk;
        document.getElementById('flength').value = data.results.day_length;
        document.getElementById('fsolar').value = data.results.solar_noon;
        document.getElementById('ftime').value = data.results.timezone;

        return fetch(tomorrowurl)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('tomsunrise').value = data.results.sunrise;
        document.getElementById('tomsunset').value = data.results.sunset;
        document.getElementById('tomdawn').value = data.results.dawn;
        document.getElementById('tomdusk').value = data.results.dusk;
        document.getElementById('tomlength').value = data.results.day_length;
        document.getElementById('tomsolar').value = data.results.solar_noon;
        document.getElementById('tomtime').value = data.results.timezone;
    })
    .catch(error => console.error('Error:', error))
    
}