import { Request, Response } from 'express'
import { getRepository, Repository, getConnection } from 'typeorm';
import { Subject } from '../entity/subject';

export class SubjectController {


    constructor() { }

    subjectRepo() {
        return getRepository(Subject);
    }

    public async getSubjectListByUserId(request: Request, responce: Response) {
        try {
            const result = await this._getSubjectListByUserId(request.params.userId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    // public async getSubjectListAndTaskCounterByUserId(request: Request, responce: Response) {
    //     try {
    //         const result = await this._getSubjectListAndTaskCounterByUserId(request.params.userId);
    //         responce.send(result);
    //     } catch (error) {
    //         responce.status(500).send(error);
    //     }
    // }

    public async createSubject(request: Request, responce: Response) {
        try {
            const result = await this._createSubject(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async updateSubject(request: Request, responce: Response) {
        try {
            await this._updateSubject(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async deleteSubject(request: Request, responce: Response) {
        try {
            await this._deleteSubject(request.params.subjectId);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    // private async _getSubjectListAndTaskCounterByUserId(userId: string): Promise<any> {
    //     const qry = {
    //         fkUserId: mongoose.Types.ObjectId(userId)
    //     };
    //     let aggQry = subjectModel.aggregate([
    //         { "$match": qry },
    //         {
    //             "$lookup": {
    //                 "from": "tasks",
    //                 "localField": "_id",
    //                 "foreignField": "fkSubjectId",
    //                 "as": "tasks"
    //             }
    //         },
    //         {
    //             "$project": {
    //                 _id: 1,
    //                 title: 1,
    //                 "taskCounter": { "$size": "$tasks" }
    //             }
    //         }


    //     ])
    //     return await aggQry.exec();
    // }

    private async _getSubjectListByUserId(userId: string): Promise<any[]> {
        return await this.subjectRepo().createQueryBuilder('subject').where('subject.userId = :id', { id: userId }).getMany();
    }

    private async _createSubject(newSubject: Subject): Promise<any> {
        const subject = await this.subjectRepo().create(newSubject);
        return await this.subjectRepo().save(subject);
    }

    private async _updateSubject(subject: Subject): Promise<Subject> {
        const subjectDb = await this.subjectRepo().findOne(subject.id);
        await this.subjectRepo().merge(subjectDb, subject);
        return await this.subjectRepo().save(subject);
    }

    private async _deleteSubject(subjectId: string): Promise<any> {
        const subject = await this.subjectRepo().findOne(subjectId);
        return await this.subjectRepo().remove(subject);
    }
}