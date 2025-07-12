const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    id:String,
    title:String,
    author:String,
    genre:String,
    year:Number,
    pages:Number,
    rating:Number,
    availability:Boolean,
    cover:String
})

const booksModel = mongoose.model('books', bookSchema)

module.exports = booksModel