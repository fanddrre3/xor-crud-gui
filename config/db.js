import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",        // isi password MySQL jika ada
  database: "xor_db"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("MySQL connected");
});

export default db;
