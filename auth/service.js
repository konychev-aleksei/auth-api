import {
  NotFound,
  Forbidden,
  Unauthorized,
  Conflict,
} from "../../utils/Errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthRepository from "./repository.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { COOKIE_SETTINGS } from "../constants.js";

class AuthService {
  static async signIn({ userName, password, fingerPrint }) {
    const userData = await AuthRepository.getUserData(userName);
    if (!userData) {
      throw new NotFound("Пользователь не найден!");
    }

    const hashedPassword = bcrypt.hashSync(password, 7);
    const isPasswordValid = bcrypt.compareSync(
      hashedPassword,
      userData.password
    );

    if (!isPasswordValid) {
      throw new Forbidden("Неверный логин или пароль!");
    }

    const payload = { userName, role: userData.role, id: userData.id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await AuthRepository.createRefreshSession({
      userName,
      refreshToken,
      fingerPrint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: COOKIE_SETTINGS.ACCESS_TOKEN.maxAge,
    };
  }

  static async signUp({ userName, password, fingerPrint, role }) {
    const userData = await AuthRepository.getUserData(userName);
    if (userData) {
      throw new Conflict("Пользователь с таким именем уже существует!");
    }

    const hashedPassword = bcrypt.hashSync(password, 7);
    const { id } = await AuthRepository.createUser({
      userName,
      hashedPassword,
      role,
    });

    const payload = { userName, role, id };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await AuthRepository.createRefreshSession({
      id,
      refreshToken,
      fingerPrint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: COOKIE_SETTINGS.ACCESS_TOKEN.maxAge,
    };
  }

  static async logOut(refreshToken) {
    if (!refreshToken) {
      throw new Unauthorized();
    }

    await AuthRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({ fingerPrint, refreshToken, user }) {
    if (!refreshToken) {
      throw new Unauthorized();
    }

    const refreshSession = await AuthRepository.getRefreshSession(refreshToken);

    if (!refreshSession) {
      throw new Forbidden(error);
    }

    await AuthRepository.deleteRefreshSession(refreshToken);

    try {
      await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Forbidden(error);
    }

    if (refreshSession.finger_print !== fingerPrint) {
      throw new Forbidden(error);
    }

    const { refresh_token } = await AuthRepository.createRefreshSession({
      id,
      refreshToken,
      fingerPrint,
    });

    const accessToken = generateAccessToken(user);
    return { accessToken, refreshToken: refresh_token };
  }
}

export default AuthService;
