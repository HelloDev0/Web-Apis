const jwt= require('jsonwebtoken')
const user= require('../model/User')

module.exports= function auth(req,res,next){
    const token= req.header('auth_token')
    if(!token) return res.status(401).send('Access Denied!!')
    try{
        const verified= jwt.verify(token,process.env.TOKEN)
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('invalid token !')
    }
};