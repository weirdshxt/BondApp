import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`Sever running on ${PORT}`);
  connectDB();
});
