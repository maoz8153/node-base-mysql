import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

export class UserController {

    userRep: Repository<User>;

    constructor() {
        this.userRep = getRepository(User);
    }


    public async getUserList(request: Request, responce: Response) {
        try {
            const result = await this._getUserList();
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async getUserById(request: Request, responce: Response) {
        try {
            const result = await this._getUserById(request.params.userId);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async createUser(request: Request, responce: Response) {
        try {
            const result = await this._createUser(request.body);
            responce.send(result);
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async updateUser(request: Request, responce: Response) {
        try {
            await this._updateUser(request.body);
            responce.status(200).send({ updated: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    public async deleteUser(request: Request, responce: Response) {
        try {
            await this._deleteUser(request.params.userId);
            responce.status(200).send({ deleted: true });
        } catch (error) {
            responce.status(500).send(error);
        }
    }

    private async _getUserList(): Promise<User[]> {
        return await this.userRep.find();
    }

    private async _getUserById(userId: string): Promise<User> {
        return await this.userRep.findOne(userId);
    }

    private async _createUser(newUser: User): Promise<User> {
        const user = await this.userRep.create(newUser);
        return await this.userRep.save(user);

    }

    private async _updateUser(user: User): Promise<User> {
        const userDb = await this.userRep.findOne(user.id);
        await this.userRep.merge(userDb, user);
        return await this.userRep.save(user);
    }

    private async _deleteUser(userId: string): Promise<any> {
        const user = await this.userRep.findOne(userId);
        return await this.userRep.remove(user);
    }
}