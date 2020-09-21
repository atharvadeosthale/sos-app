import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  token: String,
});

const UserModel = mongoose.model("users", UserSchema, "users");
export default UserModel;
