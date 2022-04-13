import { getRepository } from "typeorm"
// import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

export const Bootstrap = async () => {
    const userRepo = getRepository(User)
    const user = userRepo.create({
        FirstName: "hello",
        LastName: "hello",
        MobileNo: "789495495",
        Email:"something@some.com",
        UserName: "vjhvjvj",
        Password: "",
        Subject: "",
        Content: "",
        Blog_Created_Date: "",
    })
    // await AppDataSource.manager.save(user)
    await userRepo.save(user)
        .catch(err => console.log("error " + err));
    console.log("user saved " + user)
}