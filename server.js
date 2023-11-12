import express from "express";
import cors from "cors";
import authRootRouter from "./auth/router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRootRouter);

app.listen(5000, () => {
  console.log(`Сервер успешно запущен`);
});
