import { Request, Response, NextFunction } from 'express'
// import { UserDetails } from "../entity/UserDetails";
import { Any, getManager, getRepository, } from 'typeorm'
import { Blog } from '../entity/Blog';
import { User } from "../entity/User";
import { router } from '../router/router';
import { body, check, validationResult } from "express-validator"
import { validator } from '../middleware/validator';
// import { auth } from 'express-openid-connect';


const addUser = async(req: Request, res: Response) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({send:errors.array()})
    }
        const entityManager = getRepository(User)
        let uniqueUser=await entityManager.findOneBy({Email:req.body.Email})
        if(uniqueUser){
            res.status(401).json({message:"User already registered with same email id. So please try with another."})
        }
        let userData = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            MobileNo: req.body.MobileNo,
            Email: req.body.Email,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Blogs: req.body.blogs
        }
        let data = await entityManager.save( userData)

        res.json({
            test: "ok",
            data: data
        })

    }

const allUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.find(User,{ relations:['blogs'] })

    res.json({
        test: "ok",
        data: data
    })
}
const updateUser = async (req: Request, res: Response) => {

    const entityManager = getRepository(User)
    const { userid } = req.query
    //fetching Data
    let selectedUser = await entityManager.findOneBy({ id: req.body.id })

    selectedUser.FirstName = req.body.FirstName,
        selectedUser.LastName = req.body.LastName,
        selectedUser.MobileNo = req.body.MobileNo,
        selectedUser.Email = req.body.Email,
        selectedUser.UserName = req.body.UserName,
        selectedUser.Password = req.body.Password,

        await entityManager.save(selectedUser).catch(err => console.log("Error is here : " + err))
    res.json({
        message: "User ID: " + req.body.id + " updated succcessfully..",
        data: selectedUser
    })
}
const deleteUser = async (req: Request, res: Response) => {

    const entityManager = getRepository(User)
    let selectedUser = await entityManager.findOneBy({ id: req.body.id })
    await entityManager.remove(selectedUser).catch(err => console.log(err))

    res.json({
        message: "User ID: " + req.body.id + " removed succcessfully.."
    })
}

const authLogin = async (req: Request, res: Response) => {

    const entityManager = getRepository(User)
    //fetching Data
    console.log(req.query)
    const { UserName } = req.query
    const { Password } = req.query
    // return
    let data = await entityManager.findOne(
        {
            where: {
                UserName: `${UserName}`,
                Password: `${Password}`
            }
        }).catch(err => console.log("error is here: "+ err))
    if (data !== null) {
        //  return res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
        res.json({
            test: "ok",
            data: data
        })
    } res.json({
        message: "invalid username or password."
    })
}
const userLogin = async (req: Request, res: Response) => {
    console.log(req.params)

    console.log(req.oidc.isAuthenticated())
    res.send(await req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}

export {
    addUser, allUser, updateUser, deleteUser, userLogin, authLogin
}