// const router = require('express').Router();
// // const { cloudinary } = require('../utils/cloudinary');

// // const verify = require('./verifyToken');
// // const Joi = require('@hapi/joi')
// const Category = require('../model/Category')
// // const multer=require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, Date.now()+ file.originalname )
//     }
//   })

//   const upload = multer({ storage: storage ,
//     limits:1024*1024*5})

// router.post('/',upload.single('image') ,async (req, res) => {
//     const image = req.file.path;
//         const uploadResponse = await cloudinary.uploader.upload(image, {
//             upload_preset: 'dev_setup',
//         });
//     const postUser = new Postuser({
//         name: req.body.name,
//         image: uploadResponse.url,
//         price: req.body.price
//     })
//     try {
//         let Postuser = await postUser.save();
//         return res.status(200).json(Postuser);

//     } catch (err) {
//         return res.status(400).send(err)
//     }

// })

// router.get('/',  async (req, res) => {
//     try {
//         const postuser = await Postuser.find()
//         return res.json(postuser)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })



// module.exports = router;
const router = require('express').Router();
const Category = require('../model/Category')

router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        let savedCategory = await category.save();
        return res.status(200).json(savedCategory);

    } catch (err) {
        return res.status(400).send(err)
    }

});

router.get('/', async (req, res) => {
    try {
        await Category.find({}).populate('product').exec((err, product) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(product)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/search', async (req, res) => {
    // console.log(`query,"object",query`,req.query)
    let { query } = req.query
    try {
        await Category.find({name:query}).populate('product').exec((err, products) => {
            // console.log(query, product)
            // let productList=products.map((p)=>{return p.product})
        //   let filteredData=productList.filter(name => name = query)
          console.log("data",products)

            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(products)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        await Category.findById(req.params.id).populate('product').exec((err, product) => {
            if (err) res.status(400).send("error while fetching products !!")
            else return res.status(200).json(product)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// router.put('/', async (req, res) => {
//     try {
//         await Category.findByIdAndUpdate({}).populate("product").exec((err, product) => {
//             if (err) res.status(400).send("error while fetching products !!")
//             else return res.status(200).json(product)
//         })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })
module.exports = router;
