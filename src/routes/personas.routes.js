import { Router } from "express";
import {
  addPerson,
  getAllPerson,
  getOnePerson,
  updatePerson,
  replacePerson,
  addSkillPerson,
  deletePerson,
} from "../controllers/personas.controllers.js";

import { addSkill } from "../controllers/skill.controllers.js";

const router = Router();

router.get("/personas", getAllPerson);
router.post("/personas/add", addPerson);
router.get("/persona/:id", getOnePerson);
router.patch("/update/persona/:id", updatePerson);
router.put("/replace/persona/:id", replacePerson);
router.patch("/persona/add/skill/:id", addSkillPerson);
router.delete("/persona/delete/:id", deletePerson);
router.post("/skill/add", addSkill);

export default router;
