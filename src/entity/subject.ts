import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => User, user => user.subjects)
    user: User;

    @OneToMany(type => Task, task => task.subject)
    tasks: Task[];

}