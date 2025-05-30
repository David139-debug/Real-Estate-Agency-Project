import express from "express";
import loginController from "../controllers/loginController";
const router = express.Router();

router.post("/", loginController.handleLogin as any);

export default router