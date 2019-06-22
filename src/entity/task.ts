import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subject } from "./subject";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    complited: boolean;

    @ManyToOne(type => Subject, Subject => Subject.tasks)
    subject: Subject;

}