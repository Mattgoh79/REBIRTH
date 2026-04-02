/**
 * @file Manages all operations related to courses
 * @author att
 */
import express from "express";
 

import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.put("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});

router.delete("/:id", deleteCourse);
router.delete("/", (req, res) => {
  return res.status(400).json({
    message: "id is required in the URL parameter",
  });
});
// You can also chain routes like this:
// router.route("/").post(createCourse).get(getCourses);

export default router;