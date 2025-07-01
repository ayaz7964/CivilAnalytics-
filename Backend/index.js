const express = require("express");
const mongoose = require("mongoose");
const routes = require("../Routes/routes");
const cors = require("cors");

const app = express();

const dbURL = "mongodb+srv://ayaz:1234@cluster0.65rzobs.mongodb.net/CiviAnalytics?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://satisnation.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use("/api", routes);
app.get("/", (req, res) => res.json({ msg: "API root working" }));

// ✅ Export as serverless function
module.exports = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    return app(req, res);
  } catch (err) {
    console.error("Serverless error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
