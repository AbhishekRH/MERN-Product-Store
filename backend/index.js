import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7777;

const __dirname = path.resolve();

// Use CORS middleware
app.use(
  cors({
    // origin: "http://localhost:5173", // allow requests from your frontend
    origin:
      process.env.NODE_ENV === "production"
        ? "https://mern-product-store-eta.vercel.app/"
        : "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // allows us to accept JSON data in req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  // console.log("Server started at http://localhost:" + PORT);
});
