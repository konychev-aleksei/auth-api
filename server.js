import express from "express";
import cors from "cors";
import httpProxy from "http-proxy";
import authRootRouter from "./auth/router.js";

const proxy = httpProxy.createProxyServer();

const proxyServer = express();
const resourceServer = express();

proxyServer.all("*", (req, res) => {
  const headers = {};

  if (req.cookies?.["access_token"]) {
    headers = {
      Authorization: `Bearer ${req.cookies["access_token"]}`,
    };
  }

  proxy.web(req, res, {
    target: `http://localhost:5000`,
    ...headers,
  });
});
proxyServer.use(express.json());
proxyServer.use(cors());
proxyServer.listen(8080, () => {
  console.log("Прокси-сервер успешно запущен");
});

resourceServer.use(express.json());
resourceServer.use(
  cors({ credentials: true, origin: "http://localhost:5173" })
);
resourceServer.use("/auth", authRootRouter);
resourceServer.listen(5000, () => {
  console.log("Сервер ресурсов успешно запущен");
});

// -- //

resourceServer.get("/p", (_, res) => {
  res.sendStatus(200);
});
