const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

const app = require('./app')

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose
    .connect(DB)

const port = process.env.PORT || 3000
const server = app.listen(port , () => {
    console.log(`App is running on port ${port} ...`)
})