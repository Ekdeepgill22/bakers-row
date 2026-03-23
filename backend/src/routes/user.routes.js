import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sync",authmiddleware,registerUser);

export default router;