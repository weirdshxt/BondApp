import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`Sever running on ${PORT}`);
  connectDB();
});
