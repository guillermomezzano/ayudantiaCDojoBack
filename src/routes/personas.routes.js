import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addPerson,
  getAllPerson,
  getOnePerson,
  updatePerson,
  replacePerson,
  addSkillPerson,
  deletePerson,
  login,
} from "../controllers/personas.controllers.js";

import { addSkill } from "../controllers/skill.controllers.js";

const router = Router();

router.get("/personas", verifyToken, getAllPerson);
router.post("/personas/add", addPerson);
router.post("/login", login);
router.get("/persona/:id", verifyToken, getOnePerson);
router.patch("/update/persona/:id", verifyToken, updatePerson);
router.put("/replace/persona/:id", verifyToken, replacePerson);
router.patch("/persona/add/skill/:id", verifyToken, addSkillPerson);
router.delete("/persona/delete/:id", verifyToken, deletePerson);
router.post("/skill/add", addSkill);

export default router;
