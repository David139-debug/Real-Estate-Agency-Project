const express = require("express")
import editProfileController from "../controllers/editProfileController";
const router = express.Router();

router.put("/:id", editProfileController.handleEditProfile);

export default router