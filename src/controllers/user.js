import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @description     Get all Users
// @route           GET /api/users
// @access          Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(201).json(users);
});

// @description     Get single User
// @route           GET /api/users/:id
// @access          Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(201).json(user);
});

// @description     Create a User
// @route           POST /api/users
// @access          Public
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, role } = req.body;

  if (await User.findOne({ username })) {
    res.status(409).json({ message: "El usuario ya existe" });
  }

  const user = new User({
    firstName,
    lastName,
    username,
    password,
    role,
  });

  const createdUser = await user.save();
  res.status(201).json(createdUser);
});

// @description     Update a User
// @route           PUT /api/users/:id
// @access          Public
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.password = password;
  user.role = role;

  const updatedUser = await user.save();
  res.status(201).json(updatedUser);
});

// @description     Login User
// @route           POST /api/users/login
// @access          Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: "Usuario o contraseña invalidos" });
  }

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.role,
  });
});

export { getUsers, getUserById, createUser, updateUser, loginUser };
