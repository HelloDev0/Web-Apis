import * as express  from "express";
import { addUser ,allUser, deleteUser, updateUser} from "../controller/user";

const router =express.Router()

router.post('/user',addUser)

router.get('/user',allUser)

router.put('/user',updateUser)

router.delete('/user',deleteUser)


export{
    router
}