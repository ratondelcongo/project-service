import asyncHandler from "express-async-handler";
import Usuario from "../models/Usuario.js";

// @description     Get all Usuarios
// @route           GET /api/usuarios
// @access          Public
const getUsuarios = asyncHandler(async (req, res) => {
  const readings = await Usuario.find();

  res.json(readings);
});

// @description     Get single Usuario
// @route           GET /api/usuarios/:id
// @access          Public
const getUsuarioById = asyncHandler(async (req, res) => {
  const reading = await Usuario.findById(req.params.id);

  if (reading) {
    res.json(reading);
  } else {
    res.status(404);
    throw new Error("Reading not found");
  }
});

// @description     Create a Usuario
// @route           POST /api/usuarios
// @access          Public
const createUsuario = asyncHandler(async (req, res) => {
  const { idUsuario, username, password, Nombres, Apellidos, Email, Creado_Por } = req.body;
  const usuario = new Usuario({
    idUsuario,
    username,
    password,
    Nombres,
    Apellidos,
    Email,
    Creado_Por,
  });

  const createdUsuario = await usuario.save();
  res.status(201).json(createdUsuario);
});

// @description     Update a Usuario
// @route           PUT /api/usuarios/:id
// @access          Public
const updateUsuario = asyncHandler(async (req, res) => {});

// @description     Login Usuario
// @route           POST /api/usuarios/login
// @access          Public
const loginUsuario = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const usuarioByUsername = await Usuario.findOne({ username });
  const usuarioByPassword = await Usuario.findOne({ password });

  if (!usuarioByUsername && !usuarioByPassword) {
    res.status(201).json({ message: "Usuario y Contraseña Invalidos" });
    return;
  }

  if (!usuarioByUsername) {
    res.status(201).json({ message: "Usuario Invalido" });
    return;
  }

  if (!usuarioByPassword) {
    res.status(201).json({ message: "Contraseña Invalida" });
  }

  usuarioByUsername.Enlinea = true;
  usuarioByUsername.Num_Ingresos = usuarioByUsername.Num_Ingresos + 1;

  const updatedUsuario = await usuarioByUsername.save();

  res.status(201).json({
    usuario: updatedUsuario,
  });
});

// @description     Block a Usuario
// @route           PUT /api/usuarios/:id/block
// @access          Public
const blockUsuario = asyncHandler(async (req, res) => {
  const username = req.params.id;
  const usuario = await Usuario.findOne({ username });

  if (usuario) {
    usuario.Estado = 3;
    const updatedUsuario = await usuario.save();
    res.json(updatedUsuario);
  } else {
    res.status(404);
    throw new Error("Usuario not found");
  }
});

const createDumyUsuario = asyncHandler(async (req, res) => {
  const usuario = new Usuario({
    idUsuario: 1,
    username: "admin",
    password: "admin",
    Nombres: "admin",
    Apellidos: "admin",
    Email: "email@a.b",
    Permisos: "admin",
    Estado: 1,
    Enlinea: false,
    Num_Ingresos: 0,
    Creado_Por: 0,
    Modificado_Por: 0,
    Eliminado_Por: 0,
  });

  const createdUsuario = await usuario.save();
  res.status(201).json(createdUsuario);
});

export {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  loginUsuario,
  blockUsuario,
  createDumyUsuario,
};
