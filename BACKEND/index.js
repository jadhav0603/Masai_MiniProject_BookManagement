const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const PORT  = process.env.PORT || 5000

const userRoutes = require('./Routes/auth.Route')
const booksRoutes = require('./Routes/books.Route')


app.use(express.json())

app.use(cors());


app.use('/api/auth', userRoutes)
app.use('/api', booksRoutes)


app.listen(PORT, async ()=>{
    try{
        await mongoose.connect(process.env.MongoDB_URL)
        console.log('server successfully connected to MongoDB server')
    }
    catch(error){
        console.log('MongoDB server connecting error : ', error.message)
    }

    console.log(`server successfully running on ${PORT} PORT`)
})

