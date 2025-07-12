const jwt = require('jsonwebtoken')

const verifyUser = async(req,res,next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorize token'})
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRETE)
        req.userId = decoded.id
        next()

    }catch(error){
        return res.status(500).json({message:'user not logedin',middleware_error: error.message})
    }
}


module.exports = verifyUser