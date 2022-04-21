import { Request, Response, NextFunction } from 'express'
// import { UserDetails } from "../entity/UserDetails";
import { Any, getManager, getRepository, } from 'typeorm'
import { Blog } from '../entity/Blog';
import { User } from "../entity/User";
import { router } from '../router/router';
import { body, check, validationResult } from "express-validator"
import { validator } from '../middleware/validator';
import { AUDIENCE, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, JWKSURI } from "../config";
let axios = require('axios')
// import { auth } from 'express-openid-connect';


const addUser = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ send: errors.array() })
    }
    const entityManager = getRepository(User)
    let uniqueEmail = await entityManager.findOneBy({ Email: req.body.Email })
    let uniqueUser = await entityManager.findOneBy({ UserName: req.body.UserName })
    if (uniqueEmail || uniqueUser) {
        return res.status(401).json({ message: "User already registered with same email id or username. So please try with another." })
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
    let data = await entityManager.save(userData)

    res.json({
        // test: "ok",
        data: data
    })

}

const allUser = async (req: Request, res: Response) => {

    const entityManager = getManager()
    //fetching Data
    let data = await entityManager.find(User, { relations: ['blogs'] })

    res.json({
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
    const { UserName } = req.body
    const { Password } = req.body
    // return
    let data = await entityManager.findOne(
        {
            where: {
                UserName: `${UserName}`,
                Password: `${Password}`
            }
        }).catch(err => console.log("error is here: " + err))
    if (data !== null) {
        //  return res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
        // res.json({
        //     test: "ok",
        //     data: data
        // })
        // return
        var Clientdata = JSON.stringify({
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "audience": AUDIENCE,
            "grant_type": GRANT_TYPE
        });

        var config = {
            method: 'post',
            url: 'https://dev-iu1gyvsf.us.auth0.com/oauth/token',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'auth0=s%3Av1.gadzZXNzaW9ugqZoYW5kbGXEQKxvpj41GKs0rpzOeFGmkqcTXLvNF6lEHb6nzLUx5PznwapTD4wi_5JJXfV3Vyf3QajF9CZ99KgfCCcSHHWQ5KOmY29va2llg6dleHBpcmVz1_900zoAYlrQGa5vcmlnaW5hbE1heEFnZc4PcxQAqHNhbWVTaXRlpG5vbmU.EKGHJV8YR0QODKJDWvntf1%2BDGJkFTJW1WiTF8k955h8; auth0_compat=s%3Av1.gadzZXNzaW9ugqZoYW5kbGXEQKxvpj41GKs0rpzOeFGmkqcTXLvNF6lEHb6nzLUx5PznwapTD4wi_5JJXfV3Vyf3QajF9CZ99KgfCCcSHHWQ5KOmY29va2llg6dleHBpcmVz1_900zoAYlrQGa5vcmlnaW5hbE1heEFnZc4PcxQAqHNhbWVTaXRlpG5vbmU.EKGHJV8YR0QODKJDWvntf1%2BDGJkFTJW1WiTF8k955h8; did=s%3Av0%3Ae0aca3b0-bb24-11ec-820f-bd56d18de133.RbRf7jN%2FI0UqqMGXbV%2F3KH5NYX9H%2F78W%2BHNk%2B5I9ya4; did_compat=s%3Av0%3Ae0aca3b0-bb24-11ec-820f-bd56d18de133.RbRf7jN%2FI0UqqMGXbV%2F3KH5NYX9H%2F78W%2BHNk%2B5I9ya4'
            },
            data: Clientdata
        };

        await axios(config)
            .then(function (response) {
                return res.json(
                    {
                        token: response.data,
                        userdata: data
                    })
            })
            .catch(function (error) {
                return res.send(error)
            });
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