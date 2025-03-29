import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes,.js";
import storeRoutes from "./routes/storeRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from './utils/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.get("/api/v1", (req, res) => res.send("API is running..."));
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/items",itemRoutes);
app.use("/api/v1/collections", collectionRoutes);

// Error handling Middleware
app.use(errorHandler);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
