import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const skillSchema = new Schema({
  nombre: {
    type: String,
  },
  id_reference: {
    type: String,
    unique: true,
  },

  nivel: {
    type: String,
    enum: ["basico", "medio", "avanzado"],
  },
});

skillSchema.plugin(uniqueValidator);
const Skill = model("Skill", skillSchema);
// export default skillSchema;
export { Skill, skillSchema };
