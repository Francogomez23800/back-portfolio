import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use(cors());
    app.use(helmet());
    // register express routes from defined application routes
    app.use("/", routes);
    // setup express app here
    // ...

    // start express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => console.log(error));