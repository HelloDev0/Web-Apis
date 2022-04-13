import { Request,Response ,NextFunction} from 'express'
// import { UserDetails } from "../entity/UserDetails";
import { getManager, getRepository, } from 'typeorm'
import { Blog } from '../entity/Blog';
import { User } from '../entity/User';
// import { User } from "../entity/User";
const addBlogs = async (req: Request, res: Response) => {

    const entityManager = getManager()
    let userData = {
        Subject: req.body.Subject,
        Content: req.body.Content,
        Blog_Created_Date: req.body.Blog_Created_Date,
        user:Promise.resolve(User)
    }
    let data = await entityManager.insert(Blog,userData )

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

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.findOneBy(Blog,{})

    res.json({
        test: "ok",
        data: data
    })
}
const deleteBlogs = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.find(Blog)

    res.json({
        test: "ok",
        data: data
    })
}
export {
    addBlogs, allBlogs,updateBlogs,deleteBlogs
}