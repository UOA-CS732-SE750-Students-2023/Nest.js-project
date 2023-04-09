import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../tasks/task.entity";

@Entity() // This decorator marks the class as an entity that will be mapped to a database table.
export class User {
    @PrimaryGeneratedColumn('uuid') // This decorator marks the id property as the primary key of the entity. The uuid option specifies that the id will be generated using a UUID algorithm.
    id:string;

    @Column({unique: true}) // This decorator marks the username property as a column in the database table. The unique option specifies that the username column will have a unique constraint.
    username:string;

    @Column() // This decorator marks the password property as a column in the database table.
    password:string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];
    //  The @OneToMany decorator marks the tasks property as a one-to-many relationship with the Task entity. The type option specifies the type of the entity on the other side of the relationship, while the task option specifies the name of the property in the Task entity that represents the relationship.
}