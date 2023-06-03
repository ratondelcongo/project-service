import asyncHandler from "express-async-handler";
import Teacher from "../models/Teacher.js";

// @description     Get all Teachers
// @route           GET /api/teachers
// @access          Public
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();

  res.status(201).json(teachers);
});

// @description     Get single Teacher
// @route           GET /api/teachers/:id
// @access          Public
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404).json({ message: "Profesor no encontrado" });
  }
  res.status(201).json(teacher);
});

// @description     Create a Teacher
// @route           POST /api/teachers
// @access          Public
const createTeacher = asyncHandler(async (req, res) => {
  const { firstName, lastName, picture } = req.body;

  if (await Teacher.findOne({ firstName, lastName })) {
    res.status(409).json({ message: "El profesor ya existe" });
  }

  const teacher = new Teacher({
    firstName,
    lastName,
    picture,
  });

  const createdTeacher = await teacher.save();
  res.status(201).json(createdTeacher);
});

// @description     Update a Teacher
// @route           PUT /api/teachers/:id
// @access          Public
const updateTeacher = asyncHandler(async (req, res) => {
  const { firstName, lastName, picture } = req.body;
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404).json({ message: "Profesor no encontrado" });
  }

  teacher.firstName = firstName;
  teacher.lastName = lastName;
  teacher.picture = picture;

  const updatedTeacher = await teacher.save();
  res.status(201).json(updatedTeacher);
});

// @description     Delete a Teacher
// @route           DELETE /api/teachers/:id
// @access          Public
const deleteTeacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404).json({ message: "Profesor no encontrado" });
  }

  await Teacher.deleteOne({ _id: id });
  res.json({ message: "Profesor eliminado" });
});

export { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };
