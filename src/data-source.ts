import "reflect-metadata"
import { DataSource } from "typeorm"
import { Contact } from "./entity/Contact"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "ep-rapid-lake-90709426.us-east-2.aws.neon.tech",
    port: 5432,
    username: "fl0user",
    password: "Jg6XlqKOP5bz",
    database: "frang-databases",
    synchronize: true,
    logging: false,
    entities: [Contact],
    migrations: [],
    subscribers: [],
    extra:{
        ssl:true
    }
})
