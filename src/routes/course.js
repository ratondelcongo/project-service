import express from "express";
import {
  getCourses,
  getCourseById,
  getCoursesByName,
  createCourse,
  updateCourse,
  deleteCourse,
  addTeacherToCourse,
  removeTeacherFromCourse,
  getCoursesByTeacher,
  getTeachersByCourse,
} from "../controllers/course.js";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);
router.route("/:id/teachers/add").put(addTeacherToCourse);
router.route("/:id/teachers/remove").put(removeTeacherFromCourse);
router.route("/teacher/:id").get(getCoursesByTeacher);
router.route("/name/:name").get(getCoursesByName);
router.route("/:id/teachers").get(getTeachersByCourse);

export default router;
