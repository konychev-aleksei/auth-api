import AuthService from "./service.js";
import ErrorsUtils from "../utils/errors.js";

class AuthController {
  static async login(req, res) {
    try {
      console.log(req.body);
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async registration(req, res) {
    try {
      console.log(req.body);
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logout(req, res) {
    try {
      console.log(req.body);
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    try {
      console.log(req.body);
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
