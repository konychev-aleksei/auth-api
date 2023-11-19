import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
