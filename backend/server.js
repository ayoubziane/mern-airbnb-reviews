import express from "express";
import cors from "cors";
import airbnbs from "./api/airbnbs.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/airbnbs", airbnbs);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;
