import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task.status.enum";
import {User} from "../auth/user.entity";
import {Exclude} from "class-transformer";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')//by using this, that is going to make typeOrm automarically generates the ID for the tasks
    id: string;

    @Column()//by using this, we can tell tyoeOrm that this is a column, not a random property in a class
    title: string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    //@ManyToOne defines a many-to-one relationship between the Task entity and the User entity
    @Exclude({toPlainOnly: true})
    //The @Exclude decorator is used to exclude the user property from the response object
    user: User;

}