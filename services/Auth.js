import {
  NotFound,
  Forbidden,
  Unauthorized,
  Conflict,
} from "../../utils/Errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TokenService from "./Token.js";
import RefreshSessionsRepository from "../repositories/RefreshSessions.js";
import UserRepository from "../repositories/User.js";
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js";

class AuthService {
  static async signIn({ userName, password, fingerPrint }) {
    const userData = await UserRepository.getUserData(userName);
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

    const accessToken = TokenService.generateAccessToken(payload);
    const refreshToken = TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      userName,
      refreshToken,
      fingerPrint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async signUp({ userName, password, fingerPrint, role }) {
    const userData = await UserRepository.getUserData(userName);
    if (userData) {
      throw new Conflict("Пользователь с таким именем уже существует!");
    }

    const hashedPassword = bcrypt.hashSync(password, 7);
    const { id } = await UserRepository.createUser({
      userName,
      hashedPassword,
      role,
    });

    const payload = { userName, role, id };

    const accessToken = TokenService.generateAccessToken(payload);
    const refreshToken = TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerPrint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async logOut(refreshToken) {
    if (!refreshToken) {
      throw new Unauthorized();
    }

    await RefreshSessionsRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({ fingerPrint, currentRefreshToken }) {
    const refreshSession = await RefreshSessionsRepository.getRefreshSessions(
      currentRefreshToken
    );

    if (!refreshSession || refreshSession.finger_print !== fingerPrint) {
      throw new Forbidden(error);
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken);

    let payload;
    try {
      payload = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      throw new Forbidden(error);
    }

    const accessToken = TokenService.generateAccessToken(payload);
    const refreshToken = TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerPrint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }
}

export default AuthService;
