import pool from "../db.js";

class AuthRepository {
  static async createUser({ userName, hashedPassword, role }) {
    const response = await pool.query(
      "INSERT INTO Users (name, password, role) VALUES ($1, $2, $3) RETURNING *",
      [userName, hashedPassword, role]
    );

    return response.rows[0];
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

  static async createRefreshSession({ id, refreshToken, fingerPrint }) {
    await pool.query(
      "INSERT INTO RefreshSessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3)",
      [id, refreshToken, fingerPrint]
    );
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query("DELETE FROM RefreshSessions WHERE refresh_token=$1", [
      refreshToken,
    ]);
  }
}

export default AuthRepository;
