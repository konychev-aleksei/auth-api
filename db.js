import pg from "pg";

const pool = new pg.Pool({
  user: "wkozekiu",
  password: "AoDvBbqGKInHNDfwV4Yg4w5-tAajKU7U",
  host: "snuffleupagus.db.elephantsql.com",
  database: "wkozekiu",
});

export default pool;
