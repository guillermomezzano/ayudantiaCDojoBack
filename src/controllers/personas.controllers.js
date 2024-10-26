import Person from "../model/model.person.js";

const getAllPerson = async (req, res) => {
  try {
    const personas = await Person.find();
    return res.status(200).json(personas);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const addPerson = async (req, res) => {
  console.log(req);
  const { nombre, apellido, nacionalidad } = req.body;
  if (!nombre || !apellido || !nacionalidad) {
    return res.status(400).json({ message: "faltan campos" });
  }
  try {
    const newPerson = await Person.create(req.body);
    return res.status(201).json(newPerson);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const getOnePerson = async (req, res) => {
  console.log(req);
  try {
    const persona = await Person.findOne({ _id: req.params.id });
    return res.status(200).json(persona);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const updatePerson = async (req, res) => {
  try {
    const newPerson = await Person.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(newPerson);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const addSkillPerson = async (req, res) => {
  try {
    const newPerson = await Person.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { skill: req.body } },
      { new: true }
    );
    return res.status(200).json(newPerson);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const replacePerson = async (req, res) => {
  try {
    const newPerson = await Person.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(newPerson);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

const deletePerson = async (req, res) => {
  console.log(req);
  try {
    const persona = await Person.deleteOne({ _id: req.params.id });
    return res.status(200).json(persona);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error al crear la persona",
      error: error.message,
    });
  }
};

export {
  addPerson,
  getAllPerson,
  getOnePerson,
  updatePerson,
  replacePerson,
  addSkillPerson,
  deletePerson,
};
