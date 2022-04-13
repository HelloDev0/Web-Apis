import { Request,Response ,NextFunction} from 'express'
// import { UserDetails } from "../entity/UserDetails";
import { getManager, getRepository, } from 'typeorm'
import { User } from "../entity/User";
const addUser = async (req: Request, res: Response,next:NextFunction) => {

    const entityManager = getManager()
    let userData = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Subject: req.body.Subject,
        Content: req.body.Content,
        Blog_Created_Date: req.body.Blog_Created_Date
    }
    console.log("checking the data",userData)
// return
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
    let data = await entityManager.find(User)

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