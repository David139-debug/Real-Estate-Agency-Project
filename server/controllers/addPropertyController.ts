import { Response, Request } from "express";
import House from "../model/House";

const handleAddProperty = async (req: Request, res: Response) => {
    const data = req.body;
    const files = req.files as Express.Multer.File[];
    const imagePaths = files.map((file) => file.path);

    const newProperty = new House({
        name: data.name,
        type: data.type,
        offer: data.offer,
        heating: data.heating,
        year: data.year,
        parking: data.parking,
        location: data.location,
        region: data.region,
        price: data.price,
        text: data.text,
        img: imagePaths,
        bedroom: data.bedrooms,
        bathroom: data.bathrooms,
        area: data.area,
        balcony: data.balcony,
        pool: data.pool,
        agent: data.agent
    });
    await newProperty.save();
    res.status(200).json(newProperty);
};

export default { handleAddProperty }