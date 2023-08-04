const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherapi.com/v1/current.json?key=69d8ae48d31f4c5aa10173654231607&q="+latitude +','+longitude
    request({url,json:true},(error,response)=>{ 
        if(error){
            callback('Unable to connect weather service',undefined)
        }
        else if(response.body.error){
        callback(response.body.error.message,undefined)
        }
        else {
        callback(undefined,response.body.location.name + 
            ' It is ' + response.body.current.condition.text + ' and temp is ' + response.body.current.temp_c)
        }
    }) 
}
module.exports = forecast