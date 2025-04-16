import express from "express";
import userController from "../controllers/getUserController";
const router = express.Router();

router.get("/", userController.handleUser as any);

export default router