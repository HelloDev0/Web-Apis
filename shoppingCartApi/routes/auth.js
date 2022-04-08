const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
// const Joi=require('@hapi/joi')


router.post('/register', async (req, res) => {
    //console.log(req.body);
    //validation
    // const scema=Joi.object({
    //     name:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(3).max(15).required(),
    //     email:Joi.string().min(3).max(30).required(),
    //     password:Joi.string().min(3).required().alphanum()
    // })

    // let result=scema.validate(req.body)
    // if(result.error){
    //     res.status(400).send(result.error.details[0].message)
    // return;
    // }
    const salt=await bcrypt.genSalt(10)
    const securedPassword=await bcrypt.hash(req.body.password,salt)
    const uniqueUser=await User.findOne({email:req.body.email})
    // console.log(uniqueUser)
    if(uniqueUser){
        res.status(400).send({ message: "User is already registered !!" })
    }else{
        const user = new User({
            // 
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        });
        try {
    
            let savedUser = await user.save();
            return res.status(200).json(savedUser);
    
        } catch (err) {
            return res.status(400).send(err)
        }
    }

});

//login

router.post('/login', async (req, res) => {

    //validation
    const { email, password } = req.body
    User.findOne({ email: email }, async (err, user) => {
        if (user) {
            const passwordCompare= await bcrypt.compare(password,user.password)
            console.log(user,"hjvjhghjjvbjhvbjh",passwordCompare)
            if (passwordCompare) {
                const token = jwt.sign({user}, process.env.TOKEN, { expiresIn: 60 * 30 });
                return await res.status(200).header('auth_token', token).json({ auth_token: token });

            } else {
                res.status(400).send({ message: "Wrong Password" })
            }
        } else {
            res.status(400).send({ message: `user not registered 'or' email id not exist!` })
        }

    })

    // const user = await User.findOne({ email: req.body.email })
    // if (!user) return res.status(400).send('Email wrong');

    // const validPass = await User.findOne({ password:req.body.password})
    // if (!validPass) return res.status(400).send('Invalid Password!');

    // else{
    //     return res.send('Logged in Successfully!!')
    // }

    //create a jwt (JSON web token)
    // const token=jwt.sign({_id:user._id, name:user.name,email_id:user.email}, process.env.TOKEN, { expiresIn: 60 * 60 });
    // return res.status(200).header('auth-token', token).json({tkn:token});

})

module.exports = router;