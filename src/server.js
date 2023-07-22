import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import user from "./routes/user.js";
import teacher from "./routes/teacher.js";
import course from "./routes/course.js";
import review from "./routes/review.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", user);
app.use("/api/teachers", teacher);
app.use("/api/courses", course);
app.use("/api/reviews", review);

app.get("/status", (_, res) => {
  res.send("API is running..");
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Service running on port ${PORT}..`));
