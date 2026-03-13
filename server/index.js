import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/Authroutes.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});