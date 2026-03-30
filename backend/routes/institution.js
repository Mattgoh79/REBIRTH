/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";
import {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institution.js";
import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

import {
  validatePostInstitution,
  validatePutInstitution,
} from "../middleware/validation/institution.js";
router.post("/", validatePostInstitution, jwtAuth, rbac("ADMIN"), createInstitution,);
router.get("/", rateLimiter, getInstitutions);
router.get("/:id", rateLimiter, getInstitution);
router.put("/:id", validatePutInstitution, updateInstitution);
// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteInstitution);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createInstitution).get(getInstitutions);

export default router;