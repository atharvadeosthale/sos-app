import express from "express";
import http from "http";
import api from "./api/api.js";
import dotEnv from "dotenv";
import cors from "cors";
import db from "./connections/db.js";
import bodyParser from "body-parser";
const app = express();
const server = http.createServer(app);
const PORT = 5000;
dotEnv.config();

app.use(cors());
app.use("/api/v1", api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello the server is up and running" });
});

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
