import express from "express";
import { getUsers, getUserById, createUser, updateUser, loginUser } from "../controllers/User.js";
const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser);
router.route("/login").post(loginUser);

export default router;
