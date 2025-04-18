import { Request, Response } from 'express';
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleRegister = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const hashedPw = await bcrypt.hash(data.password, 10);
        const newUser = new User({
            name: data.name,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            password: hashedPw,
            role: "user"
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id },
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
        
        res.status(200).json({ newUser, refreshToken, accessToken });
    } catch (err: Error | unknown) {
        res.status(500).json({ message: "Registration failed." });
        console.log(err);
    }
};

export default { handleRegister };