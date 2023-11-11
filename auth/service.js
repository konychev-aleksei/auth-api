import { NotFound, Forbidden, Unauthorized } from "../utils/errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthRepository from "./repository.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateAccessToken from "../utils/generateAccessToken.js";

class PostService {
  static async login({ userName, password }) {
    const accessToken = generateAccessToken({ userName });
    const refreshToken = generateRefreshToken({ userName });

    const userData = await AuthRepository.getUserData(userName);
    if (!userData) {
      throw new NotFound("Пользователь не найден!");
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password);
    if (!isPasswordValid) {
      throw new Forbidden("Неверный логин или пароль!");
    }

    await AuthRepository.setRefreshToken(userName, refreshToken);

    return { accessToken, refreshToken };
  }

  static async registration({ userName, password }) {
    const accessToken = generateAccessToken({ userName });
    const refreshToken = generateRefreshToken({ userName });

    const hashedPassword = bcrypt.hashSync(password, 7);

    await AuthRepository.createUser({ userName, hashedPassword, refreshToken });

    return { accessToken, refreshToken };
  }

  static async logout(refreshToken) {
    if (!refreshToken) {
      throw new Unauthorized();
    }

    await AuthRepository.deleteRefreshToken(refreshToken);
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Unauthorized();
    }

    try {
      await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Forbidden(error);
    }

    const accessToken = generateAccessToken({ userName: "ww" });
    return accessToken;
  }
}

export default PostService;

/*

    
    const userData = await AuthRepository.getUserData(userName);
    if (!userData) {
      throw new NotFound("Пользователь не найден!");
    }

    if (userData.refreshToken !== refreshToken) {
      throw new Forbidden();
    }



*/
