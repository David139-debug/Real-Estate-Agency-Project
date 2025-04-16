import express from "express";
import refreshTokenController from "../controllers/refreshTokenController";
const router = express.Router();

router.post("/", refreshTokenController.handleRefresh as any);

export default router