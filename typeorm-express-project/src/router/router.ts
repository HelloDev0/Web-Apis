import * as express from "express";
import { addBlogs, allBlogs, deleteBlogs, updateBlogs } from "../controller/blogs";
import { addUser, allUser, deleteUser, updateUser, userLogin,authLogin } from "../controller/user";
// import { auth } from 'express-openid-connect';


const router = express.Router()
// routes start here
router.post('/user', addUser)

router.get('/user', allUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)

//login

router.get('/login', userLogin)

router.post('/login', authLogin)

// router.get('/logout', authLogin)


// blogs routes

router.post('/blogs', addBlogs)

router.get('/blogs', allBlogs)

router.put('/blogs', updateBlogs)

router.delete('/blogs', deleteBlogs)



export {
    router
}