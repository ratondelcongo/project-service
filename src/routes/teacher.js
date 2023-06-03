import express from "express";
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.js";

const router = express.Router();

router.route("/").get(getTeachers).post(createTeacher);
router.route("/:id").get(getTeacherById).put(updateTeacher).delete(deleteTeacher);

export default router;
