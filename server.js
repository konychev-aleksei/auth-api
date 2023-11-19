import express from "express";
import cors from "cors";
import AuthRootRouter from "./auth/router.js";


const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/auth", authRootRouter);

app.get("/resource/protected", authenticateToken, (_, res) => {
  res
    .status(200)
    .json(
      "Этот текст доступен только авторизованным пользователям " +
        new Date().now()
    );
});

app.listen(5000, () => {
  console.log("Сервер ресурсов успешно запущен");
});
