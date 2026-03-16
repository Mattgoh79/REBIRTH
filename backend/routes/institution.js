/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */import express from "express";
 

import {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institution.js";

const router = express.Router();

router.post("/", createInstitution);
router.get("/", getInstitutions);
router.get("/:id", getInstitution);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

// You can also chain routes like this:
// router.route("/").post(createInstitution).get(getInstitutions);

export default router;