import pg from "pg";

const pool = new pg.Pool({
  user: "",
  password: "",
  host: "",
  database: "wkozekiu",
});

export default pool;
