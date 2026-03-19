/**
 * @file Manages all operations related to institutions
 * @author att
 */
import express from "express";
 

import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.put("/:id", updateDepartment);
router.put("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});

router.delete("/:id", deleteDepartment);
router.delete("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});
// You can also chain routes like this:
// router.route("/").post(createInstitution).get(getInstitutions);

export default router;