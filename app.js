const express = require('express')
const path = require('path')
const app = express()
const globalErrorHandler = require('./controller/errorController')
const AppError = require('./utils/appError')
const axios = require('axios')

//front templates
app.set('view engine' ,'pug')
app.set('views' ,path.join(__dirname ,'views'))
app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname ,'public')))

app.get('/' ,(req ,res) => {
    res.status(200).render('base')
})

app.post('/' ,async(req ,res) => {
    const city = req.body.city
    const api_key = process.env.API_KEY
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`

    try{
        const response = await axios.get(url)
        const weather = response.data
        res.status(200).render('base' ,{
            weather : `It's ${weather.current.temp_c}°C in ${weather.location.name}`,
            error : null
        })
    }catch(error){
        res.status(404).render('base' ,{
            weather : null,
            error
        })
    }
}) 

app.all('*' , (req ,res ,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!` ,404))
})

app.use(globalErrorHandler)

module.exports = app;