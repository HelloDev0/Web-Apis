import { Request,Response ,NextFunction} from 'express'
// import { UserDetails } from "../entity/UserDetails";
import { getManager, getRepository, } from 'typeorm'
import { Blog } from '../entity/Blog';
import { User } from "../entity/User";
const addUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    let userData = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Blogs:Promise.resolve(Blog)
        // Subject: req.body.Subject,
        // Content: req.body.Content,
        // Blog_Created_Date: req.body.Blog_Created_Date
    }
    let data = await entityManager.insert(User,userData )

    res.json({
        test: "ok",
        data: data
    })
}

const allUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.find(User)

    res.json({
        test: "ok",
        data: data
    })
}
const updateUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.findOneBy(User,{})

    res.json({
        test: "ok",
        data: data
    })
}
const deleteUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.find(User)

    res.json({
        test: "ok",
        data: data
    })
}
export {
    addUser, allUser,updateUser,deleteUser
}