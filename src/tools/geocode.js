
const request = require ('request')

const geocode = (place , callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoibWliYm9vbyIsImEiOiJjbGtrMWJoOWgwbWppM2ttamNzNzl0NXdpIn0.j6VHYxZhvryvOkM2xF3rMg"
    request ({url : geocodeURL , json : true} , (error , response) => {
        if (error) {
            callback ("Unable to connect geocode Service" , undefined)
        }
        else if (response.body.message) {
            callback (response.body.message , undefined)
        }
        else if (response.body.features.length == 0){
            callback ("Unable to find location"  , undefined)
        } 
        else {
            callback(undefined,{
                longitude:response.body.features[0].center[1],
                latitude:response.body.features[0].center[0]
            })
        }
    } )
    }

    module.exports = geocode;
