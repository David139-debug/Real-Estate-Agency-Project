import express from "express";
import multer from "multer"
import propertyController from "../controllers/addPropertyController";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
  
const upload = multer({ storage });

router.post("/", upload.array("img", 4), propertyController.handleAddProperty);

export default router