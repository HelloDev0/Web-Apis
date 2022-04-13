import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Blog } from "./Blog"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    FirstName: string

    @Column()
    LastName: string

    @Column()
    MobileNo: string

    @Column()
    Email: string

    @Column()
    UserName: string

    @Column()
    Password: string

    @OneToMany(()=>Blog,(blog)=>blog.user,{
        cascade:true
    })
    blogs: Promise<Blog[]>;
}
