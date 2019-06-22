import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Subject } from "./subject";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    gender: string;

    @OneToMany(type => Subject, subject => subject.user)
    subjects: Subject[];

}

