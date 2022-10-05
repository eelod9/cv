window.addEventListener('load', ()=>  {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let myTime = document.querySelector('.time');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            //long = position.coords.longitude;
            //lat = position.coords.latitude;
            long = -115.365820;
            lat = 36.165110;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api=`${proxy}https://api.darksky.net/forecast/e559827c099a79336bf1f766607f7950/${lat},${long}`;
            const apicall=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a315566861aec46d06a1b502912837f7`;
            fetch(apicall)
            .then(data=>{
                return data.json();

            } )
            .then(call=>{

                console.log(call);
            })
            fetch(api)  //get data
            .then(response => {
                //call json
                return response.json();

            }) //then data obtained
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon,time}  =  data.currently; //shorthand for data.currently.temperature
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                let celsius = (temperature - 32)* (5/9);
                
                setIcons(icon,document.querySelector('.icon'));
                myTime.textContent = time;

                //change temperature to celsius
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent ==="F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent ="F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }   

                });
            });
        
        });

        

    }else{
        h1.textContent = "hey dis is not working because reasons";

    }
    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);

    }



});