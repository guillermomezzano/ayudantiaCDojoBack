import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { skillSchema } from "./model.skill.js";

const personaSchema = new Schema({
  nombre: {
    type: String,
    minLength: [3, "debe tener un minimo de 3 caracteres"],
    maxLength: [10, "debe tener un maximo de 10 caracteres"],
    required: [true, "en nombre no puede estar vacio"],
    unique: true,
  },
  apellido: {
    type: String,
    minLength: [3, "debe tener un minimo de 3 caracteres"],
    maxLength: [10, "debe tener un maximo de 10 caracteres"],
    required: [true, "en apellido no puede estar vacio"],
  },
  nacionalidad: {
    type: String,
    required: [true, "nacionalidad no puede estar vacio"],
  },
  email: {
    type: String,
    required: [true, "User phone number required"],
    unique: true,
    validate: {
      validator: (value) =>
        /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(value),
      message: "el email no es correcto",
    },
  },
  skill: [skillSchema],
});

personaSchema.plugin(uniqueValidator);
const Person = model("persona", personaSchema);
export default Person;
