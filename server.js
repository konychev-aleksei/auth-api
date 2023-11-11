import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRootRouter from "./auth/router.js";
import authenticateToken from "./utils/authenticateToken.js";

dotenv.config();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRootRouter);

app.get("/protected", authenticateToken, (req, res) => {
  res.json("Этот текст могут видеть только авторизованные пользователи");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}.`);
});
