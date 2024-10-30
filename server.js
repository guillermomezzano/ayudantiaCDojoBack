// importamos la libreria express
import express from "express";
//importamos las rutas
import personRoutes from "./src/routes/personas.routes.js";
// importamos la conexion a mongo
import conectarDB from "./src/config/config.mongo.js";
//importamos cors
import cors from "cors";
//middleWare
import { validationShema } from "./src/middleware/middleWare.js";

//creamos una instancia de express
const app = express();
// definimos el puerto
const port = 8080;
// ocupando una instancia nos conectamos a la db
conectarDB();

// me permite usar un body en los endpoint
app.use(cors());
app.use(express.json());
app.use(personRoutes);

//middleWare para rutas
app.use((req, res, next) => {
  const err = new Error("ruta no encontrada");
  err.statusCode = 400;
  next(err);
});

//middleWare para normalizar los errores
// app.use((err, req, res, next) => {
//   console.log("error del middleware", err);
//   const errorNormalizado = {
//     statusCode: err.statusCode || 500,
//     mensaje: err.message || "Ocurrio un error",
//     nombre: err.name,
//   };

//   res.status(errorNormalizado.statusCode).json(errorNormalizado);
// });

//middleWare para normalizar los errores en detalle
app.use(validationShema);

//http://localhost:8080/
//usamos el metodo listen para levantar el server
app.listen(port, () => {
  console.log(`conexion al server en el puertoooo ${port}`);
});
