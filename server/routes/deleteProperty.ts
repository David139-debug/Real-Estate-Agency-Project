const express = require("express")
import { Request, Response } from "express";
import House from "../model/House";
const router = express.Router();

router.delete("/", async (req: Request, res: Response) => {
    const { id } = req.body;

    await House.findByIdAndDelete(id);
    return res.sendStatus(200);
});

export default router