const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const verifyUser = require('../Middlewares/authMiddleware')
const userBooks = require('../Models/userBooks')
require('../Models/booksModel')



router.get('/books', async (req, res) => {
    try {
        const books = mongoose.connection.db.collection('books')
        const allBooks = await books.find().toArray()
        if (allBooks.length === 0) {
            return res.status(204).json({ message: "no content" })
        }

        return res.status(200).json(allBooks)

    } catch (error) {
        return res.status(500).json({ allBooksError: error.message })
    }
})



router.post('/myBooks/:bookId', verifyUser, async (req, res) => {
    const { bookId } = req.params
    const userId = req.userId

    // console.log(bookId)
    // console.log(userId)

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid bookId" });
    }

    try {
        const bookExists = await userBooks.findOne({ userId, bookId })

        if (bookExists) {
            return res.status(409).json({ message: 'Book already exists in MyBook Collection' })
        }

        const newBook = new userBooks({ userId, bookId })
        await newBook.save()

        return res.status(200).json({ message: 'book added in MyBook collection' })

    } catch (error) {
        console.log("Error in myBooks:", error)
        return res.status(500).json({ addMyBook_Error: error.message })
    }

})


router.get('/mybooks', verifyUser, async (req, res) => {
    const userId = req.userId

    try {
        const books = await userBooks.find({ userId }).populate('bookId')

        if (books.length === 0) {
            return res.status(204).json({ message: 'You are not added books in your collection' })
        }

        return res.status(200).json(books)


    } catch (error) {
        console.log("get User Books Error : ", error)
        return res.status(500).json({ userBookErrors: error.message })
    }
})



router.patch('/mybooks/:bookId/rating', verifyUser, async (req, res) => {
    const {bookId} = req.params
    const userId = req.userId
    const { rating } = req.body
   try {
     const userBook = await userBooks.findOne({ userId, bookId })
     if (!userBook) {
         return res.status(404).json({ message: 'book not found' })
     }
 
     userBook.rating = rating
     await userBook.save()

     return res.status(200).json({ message: 'successfully update rating' })
 
   } catch (error) {
        return res.status(500).json({ratingError : error.message})
   }
})


router.patch('/mybooks/:bookId/status',verifyUser, async (req, res) => {
    const {bookId} = req.params
    const userId = req.userId
    const { status } = req.body
   try {
     const userBook = await userBooks.findOne({ userId, bookId })
     if (!userBook) {
         return res.status(404).json({ message: 'book not found' })
     }
    
        userBook.status = status
        await userBook.save()
        return res.status(200).json({ message: 'successfully update status' })
    
    } catch (error) {
        return res.status(500).json({ReadingStatusError :error.message})
    }
})




module.exports = router
