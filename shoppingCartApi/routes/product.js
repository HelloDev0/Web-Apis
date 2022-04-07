const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');

const verify = require('../utils/verifyToken');
// const Joi = require('@hapi/joi')
const Product = require('../model/Product')
const Category = require('../model/Category')
const multer = require('multer');
const { find } = require('../model/Product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5
})






router.post('/',verify, upload.single('image'), async (req, res) => {

    const image = req.file.path;
    const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'dev_setup',
    });
    const product = new Product({
        name: req.body.name,
        image: uploadResponse.url,
        price: req.body.price,
        category: req.body.category
    })
    try {
        let Product = await product.save();
        let category = await Category.findOne({ _id: req.body.category })
        if (category.product.includes(Product._id)) {
            // console.log("not getting the data")
            return res.status(200).json(Product);

        } else {
            category.product.push(Product._id)
            let updatedCategory = await Category.findByIdAndUpdate(req.body.category, category)
            if (updatedCategory) {
                return res.status(200).json(Product)
            }
        }

    } catch (err) {
        return res.status(400).send(err)
    }

})


router.get('/', verify, async (req, res) => {
    try {
        await Product.find({}).populate("category", {

        }).exec((err, product) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(product)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router;