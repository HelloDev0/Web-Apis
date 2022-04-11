const router = require('express').Router();
const Order = require('../model/Order')

router.post('/', async (req, res) => {
    const order = new Order(req.body);
    try {
        let savedOrder = await order.save();

        return res.status(200).json(savedOrder);

    } catch (err) {
        return res.status(400).send(err)
    }
});

router.get('/', async (req, res) => {
    try {
        await Order.find({}).populate("product").exec((err, order) => {
            if (err) {res.status(400).send("error while fetching products !!")}
            else {return res.status(200).json(order)}
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//orders of a user
router.get('/:id', async (req, res) => {
    try {
        await Order.find({user:req.params.id}).populate('product').exec((err, order) => {
            if (err) {res.status(400).send("error while fetching products !!")}
            else {return res.status(200).json(order)}
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;