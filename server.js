import express from "express";
import cors from "cors";
import httpProxy from "http-proxy";
import authRootRouter from "./auth/router.js";

const proxy = httpProxy.createProxyServer();

const proxyServer = express();
const resourceServer = express();

proxyServer.all("*", (req, res) => {
  console.log(`http://localhost:5000`);
  proxy.web(req, res, { target: `http://localhost:5000` });
});

proxyServer.use(express.json());
proxyServer.use(cors());

proxyServer.listen(8080, () => {
  console.log("Прокси-сервер успешно запущен");
});


//// 

resourceServer.use(express.json());
resourceServer.use(cors());

// resourceServer.use("/auth", authRootRouter);

resourceServer.get("/p", (_, res) => {
  res.sendStatus(200);
});

resourceServer.listen(5000, () => {
  console.log("Веб-сервер успешно запущен");
});
