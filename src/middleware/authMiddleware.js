const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next)=>{
    
    let authToken= req.headers.authorization.split(" ")[1];
    // const authToken = req.cookies;
    if(authToken){
        const deCodeToken = await jwt.verify(String(authToken), process.env.SECRET)
        req.myId = deCodeToken
        next()
        // console.log(deCodeToken)
    }else{
        return res.status(400).json({error:{errorMessage:['please login']}})
    }
}


module.exports = {authMiddleware}