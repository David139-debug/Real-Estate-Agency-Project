import express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({ message: "Logged out." });
});

export default router