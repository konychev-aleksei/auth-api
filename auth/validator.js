import validateRequest from "../utils/ValidateRequest.js";
import * as Yup from "yup";

export const signInSchema = Yup.object({
  body: Yup.object({
    userName: Yup.string()
      .required("Поле обязательно!")
      .typeError("Значение должно быть строкой!"),
    password: Yup.string()
      .required("Поле обязательно!")
      .min(3, "Пароль слишком короткий - минимум 3 символа"),
  }),
});

export const signUpSchema = signInSchema.concat(
  Yup.object({
    body: Yup.object({
      role: Yup.number()
        .required("Поле обязательно!")
        .typeError("Значение должно быть числом!"),
    }),
  })
);

const refreshToken = Yup.object({
  body: Yup.object({
    refreshToken: Yup.string()
      .required("Поле обязательно!")
      .typeError("Значение должно быть строкой!"),
  }),
});

class AuthValidator {
  static async signIn(req, res, next) {
    return validateRequest(req, res, next, signInSchema);
  }

  static async signUp(req, res, next) {
    return validateRequest(req, res, next, signUpSchema);
  }

  static async logOut(req, res, next) {
    return validateRequest(req, res, next, refreshToken);
  }

  static async refresh(req, res, next) {
    return validateRequest(req, res, next, refreshToken);
  }
}

export default AuthValidator;
