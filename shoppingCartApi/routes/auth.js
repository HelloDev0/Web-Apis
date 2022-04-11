const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')


//register new user route
router.post('/register', async (req, res) => {
    const salt=await bcrypt.genSalt(10)
    const securedPassword=await bcrypt.hash(req.body.password,salt)
    const uniqueUser=await User.findOne({email:req.body.email})

    if(uniqueUser){
        res.status(400).send({ message: "User is already registered !!" })
    }else{
        const user = new User({
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

//login user route
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, async (err, user) => {
        if (user) {
            const passwordCompare= await bcrypt.compare(password,user.password)

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
})

module.exports = router;