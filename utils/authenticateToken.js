import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const authHeader = req.cookies?.["accessToken"];
  const token = authHeader?.split(" ")?.[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err, user);
    
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
