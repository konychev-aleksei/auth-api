import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2s" });
