import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/content", contentRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, _req, res, _next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS policy blocked this request." });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

start();
