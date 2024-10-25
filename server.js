// importamos la libreria express
import express from "express";
//importamos las rutas
import personRoutes from "./src/routes/personas.routes.js";
// importamos la conexion a mongo
import conectarDB from "./src/config/config.mongo.js";
//importamos cors
import cors from "cors";

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

//http://localhost:8080/
//usamos el metodo listen para levantar el server
app.listen(port, () => {
  console.log(`conexion al server en el puertoooo ${port}`);
});
