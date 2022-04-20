import { createConnection } from 'typeorm';
import {app} from './app';
import { port } from './config';

createConnection().then(async connection => {
     app.listen(port, (): void => {
    console.log("server running on " + port)
})}).catch(err=>console.log(err))