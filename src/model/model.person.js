import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { skillSchema } from "./model.skill.js";
import bcrypt from "bcrypt";

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

  password: {
    type: String,
    required: [true, "password no puede estar vacio"],
    minLength: [8, "debe tener un minimo de 8 caracteres"],
  },

  skill: [skillSchema],
});

// Agregar campo virtual para confirmación de clave secreta
personaSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Gancho de pre-validación para verificar si las claves secretas coinciden
personaSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Las claves secretas deben coincidir");
  }
  next();
});

// Gancho de pre-guardado para hashear la clave secreta
personaSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

personaSchema.plugin(uniqueValidator);
const Person = model("persona", personaSchema);
export default Person;
