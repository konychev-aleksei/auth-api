import AuthService from "./service.js";
import ErrorsUtils from "../utils/errors.js";

class AuthController {
  static async signIn(req, res) {
    const { userName, password, fingerPrint } = req.body;
    try {
      const { accessToken, refreshToken } = await AuthService.signIn({
        userName,
        password,
        fingerPrint,
      });

      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1000 });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000,
      });

      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req, res) {
    const { userName, password, role, fingerPrint } = req.body;
    try {
      const { accessToken, refreshToken } = await AuthService.signUp({
        userName,
        password,
        role,
        fingerPrint,
      });

      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1000 });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000,
      });

      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const { refreshToken } = req.body;
    try {
      await AuthService.logOut(refreshToken);

      return res.sendStatus(204);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { refreshToken } = req.body;

    try {
      const accessToken = await AuthService.refresh(refreshToken);

      return res.status(200).set(accessToken);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
