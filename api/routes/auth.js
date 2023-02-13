import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router(); //creating a router object to handle requests


router.post("/register", register);
router.post("/login", login)

export default router