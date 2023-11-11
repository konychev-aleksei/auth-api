import AuthService from "./service.js";
import ErrorsUtils from "../utils/errors.js";

class AuthController {
  static async login(req, res) {
    const { userName, password } = req.body;
    try {
      const tokens = await AuthService.login({ userName, password });

      return res.status(200).json(tokens);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async registration(req, res) {
    const { userName, password } = req.body;
    try {
      const tokens = await AuthService.registration({ userName, password });

      return res.status(200).json(tokens);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.body;
    try {
      await AuthService.logout(refreshToken);

      return res.sendStatus(204);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { refreshToken } = req.body;

    try {
      const accessToken = await AuthService.refresh(refreshToken);

      return res.status(200).json(accessToken);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
