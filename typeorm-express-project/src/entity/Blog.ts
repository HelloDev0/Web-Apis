import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Subject: string

    @Column()
    Content: string

    @Column()
    Blog_Created_Date: string

    @ManyToOne(()=>User,(user)=>user.blogs)
    user:User;
}
