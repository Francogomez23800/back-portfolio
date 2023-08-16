import "reflect-metadata"
import { DataSource } from "typeorm"
import { Contact } from "./entity/Contact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3000,
    username: "root",
    password: "Password123!",
    database: "Portfolio",
    synchronize: true,
    logging: false,
    entities: [Contact],
    migrations: [],
    subscribers: [],
})
