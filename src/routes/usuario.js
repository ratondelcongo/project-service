import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  loginUsuario,
  blockUsuario,
  createDumyUsuario,
} from "../controllers/usuario.js";
const router = express.Router();

router.route("/").get(getUsuarios).post(createUsuario);
router.route("/:id").get(getUsuarioById).put(updateUsuario);
router.route("/:id/block").put(blockUsuario);
router.route("/login").post(loginUsuario);
router.route("/dumy").post(createDumyUsuario);

export default router;
