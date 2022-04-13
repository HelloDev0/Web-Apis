import { createConnection } from "typeorm"
import { Bootstrap } from "./bootsrtap"
// import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import  * as express from "express";
import { router } from "./router/router";
import bodyParser = require("body-parser");

const app=express()
const port=4001;
app.use(bodyParser.json())
app.use('/',router)
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