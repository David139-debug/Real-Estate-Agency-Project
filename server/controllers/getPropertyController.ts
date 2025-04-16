import { Request, Response } from "express";
import House from "../model/House";

const handleProperty = async (req: Request, res: Response) => {
    try {
        const allHouses = await House.find();
        res.status(200).json(allHouses);
    } catch (err) {
        console.log(err);
    }
};

export default { handleProperty }