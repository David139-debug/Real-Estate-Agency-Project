import express from "express";
const router = express.Router(); 
import registerController from "../controllers/registerController";

router.post("/", registerController.handleRegister as any);

export default router