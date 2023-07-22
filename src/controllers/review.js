import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

// @description     Get all Reviews
// @route           GET /api/reviews
// @access          Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();

  res.status(201).json(reviews);
});

// @description     Get single Review
// @route           GET /api/reviews/:id
// @access          Public
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404).json({ message: "Review no encontrada" });
  }

  res.status(201).json(review);
});

// @description     Get Reviews by Course
// @route           GET /api/reviews/course/:id
// @access          Public
const getReviewsByCourse = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ idCourse: req.params.id });

  if (!reviews) {
    res.status(404).json({ message: "Reviews no encontradas" });
  }

  res.status(201).json(reviews);
});

// @description     Get Reviews by Teacher
// @route           GET /api/reviews/teacher/:id
// @access          Public
const getReviewsByTeacher = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ idTeacher: req.params.id });

  if (!reviews) {
    res.status(404).json({ message: "Reviews no encontradas" });
  }

  res.status(201).json(reviews);
});

// @description     Get Reviews by Teacher and Course
// @route           GET /api/reviews/teacher/:idTeacher/course/:idCourse
// @access          Public
const getReviewsByTeacherAndCourse = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    idTeacher: req.params.idTeacher,
    idCourse: req.params.idCourse,
  });

  if (!reviews) {
    res.status(404).json({ message: "Reviews no encontradas" });
  }

  res.status(201).json(reviews);
});

// @description     Create a Review
// @route           POST /api/reviews
// @access          Public
const createReview = asyncHandler(async (req, res) => {
  const { idUser, idCourse, idTeacher, rating, comment } = req.body;

  const review = new Review({
    idUser,
    idCourse,
    idTeacher,
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @description     Update a Review
// @route           PUT /api/reviews/:id
// @access          Public
const updateReview = asyncHandler(async (req, res) => {
  const { idUser, idCourse, idTeacher, rating, comment } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404).json({ message: "Review no encontrada" });
  }

  review.idUser = idUser;
  review.idCourse = idCourse;
  review.idTeacher = idTeacher;
  review.rating = rating;
  review.comment = comment;

  const updatedReview = await review.save();
  res.status(201).json(updatedReview);
});

// @description     Delete a Review
// @route           DELETE /api/reviews/:id
// @access          Public
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404).json({ message: "Review no encontrada" });
  }

  await review.remove();
  res.status(201).json({ message: "Review eliminada" });
});

export {
  getReviews,
  getReviewById,
  getReviewsByCourse,
  getReviewsByTeacher,
  getReviewsByTeacherAndCourse,
  createReview,
  updateReview,
  deleteReview,
};
