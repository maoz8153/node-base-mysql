// import { Connection, createConnection } from "typeorm";

// import "reflect-metadata";

// export class DbConnectionSerivce {

//     dbConnection: Promise<Connection>;

//     constructor() {
//         try {
//             this.dbConnection = createConnection();
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // private async createDbConnection() {
//     //     return await
//     //         createConnection({
//     //             type: "mysql",
//     //             host: "localhost",
//     //             port: 3306,
//     //             username: "root",
//     //             password: "1234",
//     //             database: "test",
//     //             entities: [
//     //                 __dirname + '/../**/**{.ts,.js}'
//     //             ],
//     //             synchronize: true,
//     //             logging: false
//     //         });
//     // }


// }