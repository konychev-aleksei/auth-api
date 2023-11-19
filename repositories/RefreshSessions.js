class RefreshSessionsRepository {
  static async getRefreshSessions(refreshToken) {
    const response = await pool.query(
      "SELECT * FROM RefreshSessions WHERE refresh_token=$1",
      [refreshToken]
    );

    return response.rows;
  }

  static async createRefreshSession({ id, refreshToken, fingerPrint }) {
    await pool.query(
      "INSERT INTO RefreshSessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3) RETURNING *",
      [id, refreshToken, fingerPrint]
    );
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query("DELETE FROM RefreshSessions WHERE refresh_token=$1", [
      refreshToken,
    ]);
  }
}

export default RefreshSessionsRepository;
