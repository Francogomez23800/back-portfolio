import "reflect-metadata"
import { DataSource } from "typeorm"
import { Contact } from "./entity/Contact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "frang-backend-g5v2-dev.fl0.io",
    port: 3306,
    username: "root",
    password: "Password123!",
    database: "Portfolio",
    synchronize: true,
    logging: false,
    entities: [Contact],
    migrations: [],
    subscribers: [],
})
