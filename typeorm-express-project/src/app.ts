import { createConnection } from "typeorm"
import { User } from "./entity/User"
import * as express from "express";
import { router } from "./router/router";
import bodyParser = require("body-parser");
import { auth } from 'express-openid-connect';
// import {expressValidator} from "express-validator"
// const { auth } = require('express-openid-connect');
// import {jwt} from 'express-jwt';
// import {jwks} from 'jwks-rsa'
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-iu1gyvsf.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://dev-iu1gyvsf.us.auth0.com/api/v2/',
  issuer: 'https://dev-iu1gyvsf.us.auth0.com/',
  algorithms: ['RS256']
});

const app = express()

// const port = 4001;
// app.use(morgan("dev"));
// app.use(helmet());
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
// app.use(jwtCheck)


app.use('/', router)

// createConnection()
//     .then( (connection) => {

//     })
//     .catch(err => console.log(err))

export {app}