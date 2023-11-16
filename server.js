import express from "express";
import cors from "cors";
import authRootRouter from "./auth/router.js";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/auth", authRootRouter);


app.listen(5000, () => {
  console.log("Сервер ресурсов успешно запущен");
});
