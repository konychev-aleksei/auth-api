import pool from "../db.js";

class AuthRepository {
  static async createUser({ userName, hashedPassword, refreshToken }) {
    await pool.query(
      "INSERT INTO Users (name, password, refresh_token) VALUES ($1, $2, $3)",
      [userName, hashedPassword, refreshToken]
    );
  }

  static async getUserData(userName) {
    const response = await pool.query("SELECT * FROM Users WHERE name=$1", [
      userName,
    ]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }

  static async setRefreshToken(userName, refreshToken) {
    await pool.query("UPDATE Users SET refresh_token=$1 WHERE name=$2", [
      refreshToken,
      userName,
    ]);
  }

  static async deleteRefreshToken(refreshToken) {
    await pool.query(
      "UPDATE Users SET refresh_token='' WHERE refresh_token=$1",
      [refreshToken]
    );
  }
}

export default AuthRepository;
