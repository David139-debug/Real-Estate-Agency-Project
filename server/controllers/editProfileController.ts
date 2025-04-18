import User from "../model/User";
import { Request, Response } from "express";

const handleEditProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body.formData;

        const matchesEmail = await User.findOne({ email: data.email });
        
        if (matchesEmail) {
            res.status(400).json({ message: "Email is already in use." });
        }

        const editedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!editedUser) {
            return res.status(400).json({ message: "User not found." });
        }
    
        return res.status(200).json(editedUser);
    } catch (err: any) {
        console.error("Update error:", err.message);
        res.status(500).json({ message: "Server error." });
    }
};

export default { handleEditProfile }