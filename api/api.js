import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API up and running" });
});

// @method POST /api/v1/login
// @desc Login Route
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    console.log("imhere");
    return res.status(400).json({ message: "All the fields are required" });
  }
  const { email, password } = req.body;
  console.log(email, password);
  const obj = await User.findOne({ email, password });
  if (!obj) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = await jwt.sign({ email }, process.env.SECRET_KEY);
  obj.token = token;
  obj.save();
  res.json({ email, name: obj.name, role: obj.role, token });
});

// @method POST /api/v1/register
// @desc Register Route
router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const { name, email, password } = req.body;
  const obj = await User.findOne({ email });
  if (obj) {
    return res.status(400).json({ message: "User with email already exists" });
  }
  const token = await jwt.sign({ email }, process.env.SECRET_KEY);

  const newUser = new User({
    name,
    email,
    password,
    role: "user",
    token,
  });
  await newUser.save();
  res.json({ name, email, role: "user", token });
});

export default router;
