import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../model/User";

const handleUser = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return;

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
        const foundUser = await User.findById(decoded.id);

        if (!decoded) {
            return res.status(401).json({ message: "Access token not found." });
        }

        if (!foundUser) {
            res.sendStatus(404);
        }
        res.status(200).json(foundUser);
    } catch (err: unknown) {
        return res.status(401).json({ message: "Invalid refresh token." });
    }
};

export default { handleUser }