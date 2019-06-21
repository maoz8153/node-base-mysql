import { createServer, Server } from 'http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { IConfig, ConfigService } from './core/config.service.core';
import { UserRoute } from './routes/user.route';



export class NodeServer {
    private app: express.Application;
    private router: Router;
    private server: Server;
    private config: IConfig;
    private dbConnection: any;

    constructor() {
        this.initDbConnection();
        this.initEnvSettings();
        this.createApp();
        this.createServer();
        this.initExpressMiddleWare();
        this.initRoutes();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    initDbConnection() {
        createConnection().then(async connection => {
            console.log(connection);
        }).catch(error => console.log("Error: ", error));
    }

    private initEnvSettings(): void {
        this.config = new ConfigService().environment;
    }

    private initExpressMiddleWare(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Content-Type', 'application/x-www-form-urlencoded');
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private initRoutes(): void {
        this.router = Router();
        new UserRoute(this.app);
        this.app.use(this.router);
    }


    private listen(): void {
        this.server.listen(this.config.NODE_PORT, () => {
            console.log('Running server on port %s', this.config.NODE_PORT);
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
