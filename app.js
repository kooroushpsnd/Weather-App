const express = require('express')
const app = express()

//front templates
app.set('view engine' ,'pug')
app.set('views' ,path.join(__dirname ,'views'))

module.exports = app;