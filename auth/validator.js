import validateRequest from "../utils/validateRequest.js";
import * as Yup from "yup";

export const userCredentials = Yup.object({
  body: Yup.object({
    userName: Yup.string()
      .required("Поле обязательно!")
      .typeError("Значение должно быть строкой!"),
    password: Yup.string()
      .required("Поле обязательно!")
      .min(8, "Пароль слишком короткий - минимум 8 символов"),
  }),
});

const refreshToken = Yup.object({
  body: Yup.object({
    refreshToken: Yup.string()
      .required("Поле обязательно!")
      .typeError("Значение должно быть строкой!"),
  }),
});

class AuthValidator {
  static async login(req, res, next) {
    return validateRequest(req, res, next, userCredentials);
  }

  static async registration(req, res, next) {
    return validateRequest(req, res, next, userCredentials);
  }

  static async logout(req, res, next) {
    return validateRequest(req, res, next, refreshToken);
  }

  static async refresh(req, res, next) {
    return validateRequest(req, res, next, refreshToken);
  }
}

export default AuthValidator;
