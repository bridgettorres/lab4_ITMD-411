document.getElementById("locations").addEventListener("change", currentLocation);

function currentLocation() {
    let latitude, longitude;
    if (this.value === "mexico") {
        latitude = 19.56652;
        longitude = -101.70683;
        document.getElementById("titlelocation").innerHTML = "Michoacán de Ocampo, Mexico";
        document.getElementById('err').innerHTML = "";
    } else if (this.value === "france"){
        latitude = 49.0754;
        longitude = 0.48937;
        document.getElementById("titlelocation").innerHTML = "Eure, France";
        document.getElementById('err').innerHTML = "";
    } else if (this.value === "brazil"){
        latitude = -4.96095;
        longitude = -45.27442;
        document.getElementById("titlelocation").innerHTML = "Maranhão, Brazil";
        document.getElementById('err').innerHTML = "";
    } else if (this.value === "italy"){
        latitude = 45.80804;
        longitude = 9.08518;
        document.getElementById("titlelocation").innerHTML = "Como, Italy";
        document.getElementById('err').innerHTML = "";
    } else if (this.value === "skorea"){
        latitude = 37.45646;
        longitude = 126.70515;
        document.getElementById("titlelocation").innerHTML = "Incheon, South Korea";
        document.getElementById('err').innerHTML = "";
    } else if (this.value === "button"){
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            document.getElementById("titlelocation").innerHTML = "Current Location";
            document.getElementById('err').innerHTML = "";
            setLocationFunc(latitude, longitude);
        },
        function(err){
            if(err.code === err.PERMISSION_DENIED) {
                document.getElementById('err').innerHTML = "Error:" + err.message;
            }
        }
        );
        return;
    } else if (this.value === "empty"){
        document.getElementById("titlelocation").innerHTML = "No Location Selected";
        document.getElementById('fsunrise').value = "";
        document.getElementById('fsunset').value = "";
        document.getElementById('fdawn').value = "";
        document.getElementById('fdusk').value = "";
        document.getElementById('flength').value = "";
        document.getElementById('fsolar').value = "";
        document.getElementById('ftime').value = "";
        document.getElementById('tomsunrise').value = "";
        document.getElementById('tomsunset').value = "";
        document.getElementById('tomdawn').value = "";
        document.getElementById('tomdusk').value = "";
        document.getElementById('tomlength').value = "";
        document.getElementById('tomsolar').value = "";
        document.getElementById('tomtime').value = "";
        document.getElementById('err').innerHTML = "";
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
    .catch(error => document.getElementById('err').innerHTML = "Error" + error.message)
    
}