import { Skill } from "../model/model.skill.js";

const addSkill = async (req, res) => {
  console.log(req);
  // const { nombre, apellido, nacionalidad } = req.body;
  // if (!nombre || !apellido || !nacionalidad) {
  //   return res.status(400).json({ message: "faltan campos" });
  // }
  try {
    const newPerson = await Skill.create(req.body);
    return res.status(201).json(newPerson);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

export { addSkill };
