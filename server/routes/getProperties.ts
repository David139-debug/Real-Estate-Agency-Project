import express from "express";
import propertyController from "../controllers/getPropertyController";
const router = express.Router();

router.get("/", propertyController.handleProperty as any);

export default router