import Person from "../model/model.person.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "$ecRet0_";

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

const addPerson = async (req, res, next) => {
  console.log(req);
  // const { nombre, apellido, nacionalidad } = req.body;
  // if (!nombre || !apellido || !nacionalidad) {
  //   return res.status(400).json({ message: "faltan campos" });
  // }
  try {
    const newPerson = await Person.create(req.body);
    return res.status(201).json(newPerson);
  } catch (error) {
    console.log(error);
    next(error);
    // return res.json({
    //   message: "Error al crear la persona",
    //   error: error.message,
    // });
  }
};

const getOnePerson = async (req, res, next) => {
  console.log(req);
  try {
    const persona = await Person.findOne({ _id: req.params.id });
    if (!persona) {
      const error = new Error("usario no encontrado id incorrecto");
      error.statusCode = 400;
      throw error;
    }
    return res.status(200).json(persona);
  } catch (error) {
    console.log(error);
    next(error);
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

const login = async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    let user = await Person.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const payload = {
      id: user._id,
    };

    let token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
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
  login,
};
