import "reflect-metadata"
import { DataSource } from "typeorm"
import { Contact } from "./entity/Contact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "ep-rapid-lake-90709426.us-east-2.aws.neon.tech:5432/frang-database",
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
