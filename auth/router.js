import { Router } from "express";
import AuthController from "./controller.js";
import AuthValidator from "./validator.js";

const router = Router();

router.post("/login", AuthValidator.login, AuthController.login);
router.post(
  "/registration",
  AuthValidator.registration,
  AuthController.registration
);
router.delete("/logout", AuthValidator.logout, AuthController.logout);
router.post("/refresh", AuthValidator.refresh, AuthController.refresh);

export default router;
