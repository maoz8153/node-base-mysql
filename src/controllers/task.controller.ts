import { Request, Response } from 'express'
import { getRepository, Repository, getConnection } from 'typeorm';
import { Task } from '../entity/task';
import { ITask } from '../models/task.model';
import { Subject } from '../entity/subject';

export class TaskController {


    constructor() { }

    taskRepo() {
        return getRepository(Task);
    }

    subjectRepo() {
        return getRepository(Subject);
    }

    public async getTaskListBySubject(request: Request, responce: Response) {
        try {
            const result = await this._getTaskListBySubject(request.params.subjectId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async createTask(request: Request, responce: Response) {
        try {
            const result = await this._createTask(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async updateTask(request: Request, responce: Response) {
        try {
            const res = await this._updateTask(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    public async deleteTask(request: Request, responce: Response) {
        try {
            const res = await this._deleteTask(request.params.tasksId);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);

        }
    }

    private async _getTaskListBySubject(subjectId: string): Promise<Task[]> {
        return await this.taskRepo().createQueryBuilder('task').where('task.subjectId = :id', { id: subjectId }).getMany();
    }

    private async _createTask(newTask: ITask): Promise<Task> {
        const subject = await this.subjectRepo().findOne(newTask.subjectId);
        const task = new Task();
        task.subject = subject;
        task.title = newTask.title;
        task.complited = newTask.complited;
        return await this.taskRepo().save(task);
    }

    private async _updateTask(task: Task): Promise<any> {
        return await this.taskRepo().update(task.id, task);
    }

    private async _deleteTask(taskId: string): Promise<any> {
        const task = await this.taskRepo().findOne(taskId);
        return await this.taskRepo().remove(task);
    }
}