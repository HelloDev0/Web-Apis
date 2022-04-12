const router = require('express').Router();
const Category = require('../model/Category')

//create new category route
router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        let savedCategory = await category.save();
        return res.status(200).json(savedCategory);

    } catch (err) {
        return res.status(400).send(err)
    }

});


//fetch all category route
router.get('/', async (req, res) => {
    try {
        await Category.find({}).populate({path:'product',select:['name','image','price']}).exec((err, product) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(product)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//search category by name only
router.get('/byName', async (req, res) => {
    let {category}=req.query
    try {
        await Category.find({category:category}).populate({path:'product',select:['name','image','price'],}).exec((err, products) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(products)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//search category by product name
router.get('/search', async (req, res) => {
    let { query } = req.query
    let {productName}=req.query||""
    try {
        await Category.find({}).populate({path:'product',select:['name','image','price'],match:{name:productName}}).exec((err, products) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(products)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;
