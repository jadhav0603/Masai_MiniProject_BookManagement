const mongoose = require ('mongoose')

const userBooksSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    },
    bookId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'books',
        required : true
    },
    rating:{
        type:Number,
        min : 1,
        max : 5,
        default : 1
    },
    status:{
        type:String,
        enum:["Want to Read","Currently Reading", 'Read'],
        default : "Want to Read"
    },
    createdAt:{
        type:Date,
        default : Date.now
    }
})

const userBooksModel = mongoose.model('userbooks', userBooksSchema)

module.exports = userBooksModel