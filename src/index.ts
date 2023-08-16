import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    // Crear la instancia de la aplicación Express
    const app = express();
    app.use(bodyParser.json());

    app.use(cors());
    app.use(helmet());
    app.use("/", routes);

    // Obtener las rutas absolutas a los archivos de clave privada y certificado
    const privateKeyPath = path.join(__dirname, 'path', 'to', 'private-key.pem');
    const certificatePath = path.join(__dirname, 'path', 'to', 'certificate.pem');

    // Configurar opciones para el certificado SSL
    const sslOptions = {
      key: fs.readFileSync(privateKeyPath),
      cert: fs.readFileSync(certificatePath)
    };

    // Crear un servidor HTTPS con certificado SSL
    const httpsServer = https.createServer(sslOptions, app);

    // Escuchar en el puerto 443 para conexiones HTTPS
    httpsServer.listen(443, () => {
      console.log('Servidor HTTPS iniciado en el puerto 443');
    });

    // Redireccionar las solicitudes HTTP a HTTPS
    const httpServer = http.createServer((req, res) => {
      res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
      res.end();
    });

    // Escuchar en el puerto 80 para conexiones HTTP (redireccionamiento)
    httpServer.listen(80, () => {
      console.log('Servidor HTTP de redirección iniciado en el puerto 80');
    });

  })
  .catch((error) => console.log(error));
