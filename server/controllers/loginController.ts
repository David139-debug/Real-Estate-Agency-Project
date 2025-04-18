import User from "../model/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginData {
    email: string;
    password: string;
}

const handleLogin = async (req: Request, res: Response) => {
    const data = req.body as unknown as LoginData;
    if (!data) return res.status(400).json({ message: "Data not received." });

    try {
        const foundUser = await User.findOne({ email: data.email });
        const matchedPw = await bcrypt.compare(data.password as string, foundUser?.password as string);
        if (!foundUser || !matchedPw) {
            return res.status(403).json({ message: "Invalid email or password." });
        }
        const accessToken = jwt.sign(
            { id: foundUser.id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        );
        
        const refreshToken = jwt.sign(
            { id: foundUser.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.status(200).json({ foundUser, accessToken, refreshToken });
    } catch (err) {
        res.status(400).json({ message: "Error occurred." });
    }
};

export default { handleLogin }