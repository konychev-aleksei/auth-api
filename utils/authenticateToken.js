import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Forbidden, Unauthorized } from "./Errors.js";

dotenv.config();

export default (req, _, next) => {
  const authHeader = req.cookies?.["Authrorization"];
  const token = authHeader?.split(" ")?.[1];

  if (!token) {
    return next(new Unauthorized());
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err, user);

    if (err) {
      return next(new Forbidden());
    }

    req.user = user;
    next();
  });
};
