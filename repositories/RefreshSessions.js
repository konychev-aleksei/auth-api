import pool from "../db.js";

class RefreshSessionsRepository {
  static async getRefreshSessions(refreshToken) {
    const response = await pool.query(
      "SELECT * FROM RefreshSessions WHERE refresh_token=$1",
      [refreshToken]
    );

    return response.rows;
  }

  static async createRefreshSession({ id, refreshToken, fingerprint }) {
    await pool.query(
      "INSERT INTO RefreshSessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3) RETURNING *",
      [id, refreshToken, fingerprint.hash]
    );
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query("DELETE FROM RefreshSessions WHERE refresh_token=$1", [
      refreshToken,
    ]);
  }
}

export default RefreshSessionsRepository;
