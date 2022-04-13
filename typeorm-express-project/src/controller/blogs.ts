import { Request, Response, NextFunction } from 'express'
import { getManager, getRepository, } from 'typeorm'
import { Blog } from '../entity/Blog';
import { User } from '../entity/User';
const addBlogs = async (req: Request, res: Response) => {

    const entityManager = getManager()
    let userData = {
        Subject: req.body.Subject,
        Content: req.body.Content,
        Blog_Created_Date: req.body.Blog_Created_Date,
        user: Promise.resolve(User)
    }
    let data = await entityManager.insert(Blog, userData)

    res.json({
        test: "ok",
        data: data
    })
}

const allBlogs = async (req: Request, res: Response) => {

    const entityManager = getRepository(Blog)
    //fetching Data
    let data = await entityManager.find()

    res.json({
        test: "ok",
        data: data
    })
}
const updateBlogs = async (req: Request, res: Response) => {

    const entityManager = getRepository(Blog)
    //fetching Data
    let selectedBlog = await entityManager.findOneBy({ id: req.body.id })

    selectedBlog.Subject = req.body.Subject
    selectedBlog.Content = req.body.Content
    selectedBlog.Blog_Created_Date = req.body.Blog_Created_Date

    await entityManager.save(selectedBlog).catch(err => console.log("Error is here :" + err))
    res.json({
        message: "User ID: " + req.body.id + " updated succcessfully..",
        data: selectedBlog
    })
}
const deleteBlogs = async (req: Request, res: Response) => {

    const entityManager = getRepository(Blog)
    //fetching Data
    let selectedBlog = await entityManager.findOneBy({ id: req.body.id })
    await entityManager.remove(selectedBlog).catch(err => console.log(err))

    res.json({
        message: "User ID: " + req.body.id + " removed succcessfully.."
    })
}
export {
    addBlogs, allBlogs, updateBlogs, deleteBlogs
}