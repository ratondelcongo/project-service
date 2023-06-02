import express from "express";
import connectDB from "./config/db.js";
import user from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", user);
app.get("/status", (_, res) => {
  res.send("API is running..");
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Service running on port ${PORT}..`));
