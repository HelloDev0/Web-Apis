import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    @Column()
    Subject: string

    @Column()
    Content: string

    @Column()
    Blog_Created_Date: string

}
