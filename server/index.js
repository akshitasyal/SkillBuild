import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/Authroutes.js";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import { prisma } from "./utils/prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.ORIGIN.split(",").map((o) => o.trim().replace(/"/g, "")),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// TEMP: One-time admin promotion route — will be removed after use
app.post("/api/setup-admin-xk92p", async (req, res) => {
  try {
    const { secret, email } = req.body;
    if (secret !== "SETUP_ADMIN_SECRET_2024") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin", username: "admin", fullName: "Admin User", description: "Platform Administrator", isProfileInfoSet: true },
    });
    return res.status(200).json({ message: `User ${user.email} promoted to admin`, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});