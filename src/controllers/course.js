import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";

// @description     Get all Courses
// @route           GET /api/courses
// @access          Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  res.status(201).json(courses);
});

// @description     Get single Course
// @route           GET /api/courses/:id
// @access          Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  res.status(201).json(course);
});

// @description     Get Courses by alike name
// @route           GET /api/courses/name/:name
// @access          Public
const getCoursesByName = asyncHandler(async (req, res) => {
  const courses = await Course.find({
    name: { $regex: req.params.name, $options: "i" },
  });

  if (!courses) {
    res.status(404).json({ message: "Cursos no encontrados" });
  }

  res.status(201).json(courses);
});

// @description     Create a Course
// @route           POST /api/courses
// @access          Public
const createCourse = asyncHandler(async (req, res) => {
  const { code, name } = req.body;

  if (await Course.findOne({ code })) {
    res.status(409).json({ message: "El curso ya existe" });
  }

  const course = new Course({
    code,
    name,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @description     Update a Course
// @route           PUT /api/courses/:id
// @access          Public
const updateCourse = asyncHandler(async (req, res) => {
  const { code, name } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  course.code = code;
  course.name = name;

  const updatedCourse = await course.save();
  res.status(201).json(updatedCourse);
});

// @description     Delete a Course
// @route           DELETE /api/courses/:id
// @access          Public
const deleteCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const course = await Course.findById(id);

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  await Course.deleteOne({ _id: id });
  res.status(201).json({ message: "Curso eliminado" });
});

// @description     Add a Teacher to a Course
// @route           PUT /api/courses/:id/teachers/add
// @access          Public
const addTeacherToCourse = asyncHandler(async (req, res) => {
  const { teacherId } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  if (!course.teachers.includes(teacherId)) {
    course.teachers.push(teacherId);
  }

  const updatedCourse = await course.save();
  res.status(201).json(updatedCourse);
});

// @description     Remove a Teacher from a Course
// @route           PUT /api/courses/:id/teachers/remove
// @access          Public
const removeTeacherFromCourse = asyncHandler(async (req, res) => {
  const { teacherId } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  if (course.teachers.includes(teacherId)) {
    course.teachers.pull(teacherId);
  }

  const updatedCourse = await course.save();
  res.status(201).json(updatedCourse);
});

// @description     List Courses by Teacher
// @route           GET /api/courses/teacher/:id
// @access          Public
const getCoursesByTeacher = asyncHandler(async (req, res) => {
  const courses = await Course.find({ teachers: req.params.id });

  res.status(201).json(courses);
});

// @description     List Teachers by Course
// @route           GET /api/courses/:id/teachers
// @access          Public
const getTeachersByCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate("teachers");

  if (!course) {
    res.status(404).json({ message: "Curso no encontrado" });
  }

  res.status(201).json(course.teachers);
});

export {
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
};
