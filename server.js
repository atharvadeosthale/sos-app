import express from "express";
import http from "http";
import api from "./api/api.js";
import dotEnv from "dotenv";
import SocketIO from "socket.io";
import cors from "cors";
import db from "./connections/db.js";
import User from "./models/User.js";
import bodyParser from "body-parser";
import { CLIENT_RENEG_WINDOW } from "tls";
const app = express();
const server = http.createServer(app);
const PORT = 5000;
dotEnv.config();

const io = new SocketIO(server);
app.use(cors());
app.use("/api/v1", api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello the server is up and running" });
});

// socket starts here

// user pools
var users = [];
var hospitals = [];

io.on("connection", async (socket) => {
  var role;

  console.log("Someone connected to server");

  // socket auth
  socket.on("auth", async (token) => {
    try {
      const obj = await User.findOne({ token });
      if (!obj) {
        return socket.emit("auth", { status: false });
      }

      // adding person to online pool
      if (obj.role === "user") {
        role = "user";
        users.push({
          id: obj._id,
          socket: socket.id,
          token: obj.token,
          name: obj.name,
          email: obj.email,
          hospital_id: null,
          role: obj.role,
          lat: null,
          lng: null,
        });
        console.log(users);
      } else if (obj.role === "hospital") {
        // TODO: add hospital pool user adding
        role = "hospital";
        hospitals.push({
          id: obj._id,
          socket: socket.id,
          token: obj.token,
          name: obj.name,
          email: obj.email,
          role: obj.role,
          user_id: null,
        });
      }
      return socket.emit("auth", { status: true, role: obj.role });
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("location", (position) => {
    var index = users.findIndex((user) => user.socket === socket.id);
    if (index === -1) return;

    users[index].lat = position.lat;
    users[index].lng = position.lng;
  });

  socket.on("sos", () => {
    const userIndex = users.findIndex((user) => user.socket === socket.id);
    if (userIndex === -1) return;
    if (hospitals.length === 0) return socket.emit("no-hospitals");
    // TODO: alert the hospitals
  });

  // handle user disconnect
  socket.on("disconnect", () => {
    // remove from either users pool or hospital pool
    if (!role) return;
    // check the role and remove from specific pool
    if (role === "user") {
      users.filter((user) => user.socket != socket.id);
    }
    if (role === "hospital") {
      hospitals.filter((hospital) => hospital.socket != socket.id);
    }
  });
});

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
