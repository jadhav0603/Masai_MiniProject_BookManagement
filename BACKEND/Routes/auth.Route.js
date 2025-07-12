const express = require('express')
const router = express.Router()
const users = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const verifyUser = require('../Middlewares/authMiddleware')

const JWT_SECRETE = process.env.JWT_SECRETE

router.post('/register', async(req,res)=>{
    const {userName,email,password,gender,DOB} = req.body
    try{
        const user = await users.findOne({email})
        if(user){
            return res.status(409).json({message:"user already existed"})
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = await new users({userName,email,password:hashPass,gender, DOB})
        await newUser.save()

        return res.status(201).json('user Registered Successfully')

    }catch(error){
        return res.status(500).json({registerBackendError: error.message})
    }

})




router.post('/login', async(req,res)=>{
    const {email, password} = req.body
    try{
        const userExists= await users.findOne({email})

        if(!userExists){
            return res.status(404).json({message:  'user not found'})
        }

        const dcrypt = await bcrypt.compare(password, userExists.password)
        if(!dcrypt){
            return res.status(403).json({message: 'Invalid Credentials'})
        }

        const token = await jwt.sign({id:userExists._id,email}, JWT_SECRETE, {expiresIn : '1h'})

        return res.status(200).json({message: 'Login Successfully', token, email:userExists.email})

    }catch(error){
        return res.status(500).json({loginError : error.message})
    }
})


router.get('/me', verifyUser, async(req,res)=>{
    const userId = req.userId
    try {
        const userData = users.findById({userId})
        if(!userData){
            return res.status(404).json({message: 'user not found'})
        }
    
        return res.status(200).json(userData)
    
    } catch (error) {
        return res.status(500).json({userDetailsError : error})
    }
})




module.exports = router