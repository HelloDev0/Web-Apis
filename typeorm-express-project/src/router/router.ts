import * as express from "express";
import { addBlogs, allBlogs, deleteBlogs, updateBlogs } from "../controller/blogs";
import { addUser, allUser, deleteUser, updateUser, userLogin, authLogin } from "../controller/user";
// import { auth } from 'express-openid-connect';


const router = express.Router()
// routes start here
router.post('/user', addUser)

router.get('/', allUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)

//login

router.get('/login', (req: express.Request, res: express.Response) => {
    res.json({
        response: "logged in successfully",
        isAuthenticated: req.oidc.isAuthenticated()
    })
})

router.post('/auth', authLogin)

// router.get('/logout', authLogin)


// blogs routes

router.post('/blogs', addBlogs)

router.get('/blogs', allBlogs)

router.put('/blogs', updateBlogs)

router.delete('/blogs', deleteBlogs)



export {
    router
}