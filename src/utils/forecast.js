const request = require('request');

const forecast = (latitude , longitude, callback ) => {
    const url = "http://api.weatherstack.com/current?access_key=14efa6ba370bdf6612d47be0c211a6b4&query=" + latitude + "," + longitude +"&units=f";
    debugger
    request({ url , json: true}, (error , {body}) =>{
        if (error){
            callback('Unable to connect to network', undefined)
        }else if(body.error){
            callback('Unable to find forecast! Try different address' , undefined)
        }else{
            const weather_descriptions =  body.current.weather_descriptions;
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const humidity = body.current.humidity;
            callback(undefined , "It is currently" + weather_descriptions + ". Temperature is " + temperature + " and feels like " + feelslike + ". Humidity level is " + humidity)
        }
    })

}

module.exports = forecast ;