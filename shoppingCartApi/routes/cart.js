const router = require('express').Router();
const Cart = require('../model/Cart')
const verify=require('../utils/verifyToken')


router.post('/',verify, async (req, res) => {
    const cartExist = await Cart.findOne({ user: req.body.user })
    if (cartExist) {
        if(!cartExist.product.includes(req.body.product)){
            cartExist.product.push(req.body.product)
            let savedCart=await Cart.findByIdAndUpdate({_id: cartExist._id},cartExist)
            return res.status(200).json(savedCart)
        }else{
           return res.status(300).send("Product exist in your cart. Please add another product!!")
        }
    } else {
        const cart = new Cart(req.body);
        try {
            let savedCart = await cart.save();

            return res.status(200).json(savedCart);

        } catch (err) {
            return res.status(400).send(err)
        }
    }
});


//fetch all cart data route
router.get('/',verify, async (req, res) => {
    try {
        await Cart.find({}).populate({path:"product",select:["name","price"]}).populate({path:"user",select:"name"}).exec((err, cart) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(cart)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//cart of a user
router.get('/:id', async (req, res) => {
    try {
        await Cart.find({user:req.params.id}).populate({path:"product",select:"name"}).exec((err, cart) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(cart)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;