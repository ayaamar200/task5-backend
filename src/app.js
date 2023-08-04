    var hbs = require ('hbs')

    const geocode = require('./tools/geocode')
    const forecast = require('./tools/forecast')

    const express = require('express')
    
    const app = express()
    const port = process.env.PORT || 3000

    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')    
    app.use (express.static (publicDirectory))

    const viewsDirectory = path.join (__dirname , "../temp1/views" )
    app.set( "views" , viewsDirectory)

    const partialsPath = path.join (__dirname , "../temp1/partials")
    hbs.registerPartials(partialsPath) 

    app.set('view engine', 'hbs');

    app.get('/' , (req , res) => {
        res.render('index' , {
            title: " Weather Forecast Api ",
            desc : "Hey Friend , This is a Weather Forecast api Website ",
        })
    })

    app.get('/check' , (req , res) => {
        res.render('check' , {
            title : "Today's Weather",
            desc: "See the weather any time of any place in the world..",
        })
    })


    app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'You must provide address'
            })
        }
        geocode(req.query.address,(error,data)=>{
            if(error){
                // shorthand property error:error
                return res.send({error})
            }
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location:req.query.address ,
                    location:req.query.address,
                    latitude:data.latitude,
                    longitude:data.longitude
                })
            })
        })
    })
    
    app.get('*' , (req , res)=> {
        res.send('404 Page Not Founded')
    })

//  اخر حاجة فى الكود
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
