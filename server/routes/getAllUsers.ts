const express = require("express")
import User from "../model/User";
import { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const allUsers = await User.find();
    
    return res.status(200).json(allUsers);
});

export default router