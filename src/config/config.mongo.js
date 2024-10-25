import Mongoose from "mongoose";

async function conectarDB() {
  try {
    await Mongoose.connect("mongodb://localhost:27017/personas", {});
    console.log("conexion exitosa a mongo!!!!");
  } catch (error) {
    console.log("error al conectar a mongo", error);
    throw error;
  }
}

export default conectarDB;
