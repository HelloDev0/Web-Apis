import * as express from "express";
import { body, check } from "express-validator";
import { AUDIENCE, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, JWKSURI } from "../config";
import { addBlogs, allBlogs, deleteBlogs, updateBlogs } from "../controller/blogs";
import { addUser, allUser, deleteUser, updateUser, userLogin, authLogin } from "../controller/user";
// import { auth } from 'express-openid-connect';

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require('express-jwt-permissions')()
let axios = require('axios');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: JWKSURI
    }),
    audience: AUDIENCE,
    issuer: 'https://dev-iu1gyvsf.us.auth0.com/',
    algorithms: ['RS256']
});

const router = express.Router()
// routes start here
router.post('/user', [
    body('Email').isEmail().normalizeEmail(),
    body('UserName').not().isEmpty(),
    body('FirstName').not().isEmpty(),
    body('LastName').not().isEmpty(),
    body('MobileNo').not().isEmpty().isLength({ min: 10 }),
    check('Password', 'The password must be 5+ chars long and contain a number')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 5 })
        .matches(/\d/)
], addUser)

router.get('/user', jwtCheck, allUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)

//login

// router.get('/authorized', (req: express.Request, res: express.Response) => {
//     // console.log("Hello david")
//     var data = JSON.stringify({
//         "client_id": CLIENT_ID,
//         "client_secret": CLIENT_SECRET,
//         "audience": AUDIENCE,
//         "grant_type": GRANT_TYPE
//     });

//     var config = {
//         method: 'post',
//         url: 'https://dev-iu1gyvsf.us.auth0.com/oauth/token',
//         headers: {
//             'Content-Type': 'application/json',
//             'Cookie': 'auth0=s%3Av1.gadzZXNzaW9ugqZoYW5kbGXEQKxvpj41GKs0rpzOeFGmkqcTXLvNF6lEHb6nzLUx5PznwapTD4wi_5JJXfV3Vyf3QajF9CZ99KgfCCcSHHWQ5KOmY29va2llg6dleHBpcmVz1_900zoAYlrQGa5vcmlnaW5hbE1heEFnZc4PcxQAqHNhbWVTaXRlpG5vbmU.EKGHJV8YR0QODKJDWvntf1%2BDGJkFTJW1WiTF8k955h8; auth0_compat=s%3Av1.gadzZXNzaW9ugqZoYW5kbGXEQKxvpj41GKs0rpzOeFGmkqcTXLvNF6lEHb6nzLUx5PznwapTD4wi_5JJXfV3Vyf3QajF9CZ99KgfCCcSHHWQ5KOmY29va2llg6dleHBpcmVz1_900zoAYlrQGa5vcmlnaW5hbE1heEFnZc4PcxQAqHNhbWVTaXRlpG5vbmU.EKGHJV8YR0QODKJDWvntf1%2BDGJkFTJW1WiTF8k955h8; did=s%3Av0%3Ae0aca3b0-bb24-11ec-820f-bd56d18de133.RbRf7jN%2FI0UqqMGXbV%2F3KH5NYX9H%2F78W%2BHNk%2B5I9ya4; did_compat=s%3Av0%3Ae0aca3b0-bb24-11ec-820f-bd56d18de133.RbRf7jN%2FI0UqqMGXbV%2F3KH5NYX9H%2F78W%2BHNk%2B5I9ya4'
//         },
//         data: data
//     };

//     axios(config)
//         .then(function (response) {
//             return res.json({ token: response.data })
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// })

//user can login after giving the correct username and password and iot returns the jwt.
router.post('/login', authLogin)



// blogs routes

router.post('/blogs', [
    body('Subject').not().isEmpty(),
    body('Content').not().isEmpty(),
    body('Blog_Created_Date').not().isEmpty(),
    // body('user').not().isEmpty()
],
    addBlogs)

router.get('/blogs', allBlogs)

router.put('/blogs', updateBlogs)

router.delete('/blogs', deleteBlogs)



export {
    router
}