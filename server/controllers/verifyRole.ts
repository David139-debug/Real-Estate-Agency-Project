import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";

const handleVerify = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(400).json({ message: "You must be authorized" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
    const foundUser = await User.findById(decoded.id);

    const role = foundUser?.role;
    return res.status(200).json(role);
};

export default { handleVerify }