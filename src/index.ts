import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import https from 'https';
import http from 'http';
import fs from 'fs';

const PORT = process.env.PORT || 3000;

// Configura las opciones del certificado SSL
const sslOptions = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

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

    // Crea el servidor HTTPS
    const server = https.createServer(sslOptions, app);

    // Inicia el servidor en el puerto 443 (puerto HTTPS)
    server.listen(443, () => {
      console.log('Servidor HTTPS iniciado en el puerto 443');
    });

    // Crea un servidor HTTP para redireccionar a HTTPS
    const httpServer = http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
      res.end();
    });

    // Inicia el servidor HTTP en el puerto 80 (puerto HTTP)
    httpServer.listen(80, () => {
      console.log('Servidor HTTP de redirección iniciado en el puerto 80');
    });

  })
  .catch((error) => console.log(error));
