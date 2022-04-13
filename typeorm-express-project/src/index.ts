import { createConnection } from "typeorm"
// import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import  * as express from "express";
import { router } from "./router/router";
import bodyParser = require("body-parser");
import {auth} from 'express-openid-connect';
// const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'fdgdf1g5fd15f1h5hgvgjhgjhgjhvfcgchgvjbjkbjh15f1h5g1dsfgsd55115sdfg1515s4445g45ssg4',
    baseURL: 'http://localhost:4001',
    clientID: 'PpeBsg0sYYIaA2ZE3pbN5oga80hVQ0kS',
    issuerBaseURL: 'https://dev-iu1gyvsf.us.auth0.com'
  };

const app=express()
app.use(auth(config));

const port=4001;
app.use(bodyParser.json())
app.use('/',router)

// app.get('/login', (req, res) => {
//     console.log(req.oidc.isAuthenticated())
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });
createConnection()
    .then(async (connection) => {
        // console.log("inserting a new user")
        // const user = new User()
        // user.FirstName = "Timber"
        // user.LastName = "Saw"
        // user.MobileNo = "25"
        // user.UserName = "Timber"
        // user.Password = "Saw"
        // user.Subject = "25"
        // user.Content = "Timber"
        // user.Blog_Created_Date = "Saw"

        // await connection.manager.save(user);
        // console.log("saved a new user "+user.id)

        // console.log("loading users")
        // const users=await connection.manager.find(User)
        // console.log("data from the user "+users)

        // console.log("all set up")
        // // for insertion data manually
        // await Bootstrap().catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))

    app.listen(port,():void=>{
        console.log("server running on "+port)
    })