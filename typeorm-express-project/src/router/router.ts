import * as express  from "express";
import { addBlogs, allBlogs, deleteBlogs, updateBlogs } from "../controller/blogs";
import { addUser ,allUser, deleteUser, updateUser} from "../controller/user";

const router =express.Router()

router.post('/user',addUser)

router.get('/user',allUser)

router.put('/user',updateUser)

router.delete('/user',deleteUser)

// blogs routes

router.post('/blogs',addBlogs)

router.get('/blogs',allBlogs)

router.put('/blogs',updateBlogs)

router.delete('/blogs',deleteBlogs)
export{
    router
}