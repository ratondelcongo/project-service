import express from "express";
import {
  getReviews,
  getReviewById,
  getReviewsByCourse,
  getReviewsByTeacher,
  getReviewsByTeacherAndCourse,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.js";

const router = express.Router();

router.route("/").get(getReviews).post(createReview);
router.route("/:id").get(getReviewById).put(updateReview).delete(deleteReview);
router.route("/course/:id").get(getReviewsByCourse);
router.route("/teacher/:id").get(getReviewsByTeacher);
router.route("/teacher/:idTeacher/course/:idCourse").get(getReviewsByTeacherAndCourse);

export default router;
