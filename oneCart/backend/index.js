import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[ "http://localhost:5173", "http://localhost:5174"],  // ✅ no extra space
    credentials: true
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDb();
});
