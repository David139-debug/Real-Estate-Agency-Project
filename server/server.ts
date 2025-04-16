import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB"
import register from "./routes/register";
import getUser from "./routes/getUser";
import refresh from "./routes/refresh";
import login from "./routes/login";
import logout from "./routes/logout";
import addProperty from "./routes/addProperty";
import getProperty from "./routes/getProperties";
import deleteProperty from "./routes/deleteProperty";
import editProfile from "./routes/editProfile";
import getUsers from "./routes/getAllUsers";

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URI,
               credentials: true
 }));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use("/register", register);
app.use("/getUser", getUser);
app.use("/refresh", refresh);
app.use("/login", login);
app.use("/logout", logout);
app.use("/addProperty", addProperty);
app.use("/getProperty", getProperty);
app.use("/deleteProperty", deleteProperty);
app.use("/editProfile", editProfile);
app.use("/getUsers", getUsers);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log("Server running on port", process.env.PORT);
    });
});