import { createConnection } from "typeorm"
import { User } from "./entity/User"
import * as express from "express";
import { router } from "./router/router";
import bodyParser = require("body-parser");
import { auth } from 'express-openid-connect';
// import {expressValidator} from "express-validator"
// const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:4001/',
    clientID: '4kdHskWXeWOa2OOQOe8zj9Yoc01PKdNA',
    issuerBaseURL: 'https://dev-iu1gyvsf.us.auth0.com'
};

const app = express()

const port = 4001;
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(auth(config));


app.use('/', router)

createConnection()
    .then(async (connection) => {

    })
    .catch(err => console.log(err))

export {app,port}