const express = require("express")
import verifyRole from "../controllers/verifyRole";
const router = express.Router();

router.get("/", verifyRole.handleVerify);

export default router