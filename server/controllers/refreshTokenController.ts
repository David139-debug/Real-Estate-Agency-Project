import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";

const handleRefresh = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
    const foundUser = await User.findById(decoded.id);

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: foundUser?.role },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }
};

export default { handleRefresh }