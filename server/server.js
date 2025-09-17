const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// เชื่อม database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "รหัสผ่านของคุณ",
  database: "game_db"
});

// เช็ก connection
db.connect(err => {
  if(err) {
    console.log("❌ MySQL connection error:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

// ดึง user ทั้งหมด
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if(err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// เพิ่ม user ใหม่
app.post("/api/register", (req, res) => {
  const { username, password, role } = req.body;
  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, password, role || "user"],
    (err, results) => {
      if(err) return res.status(500).json({ error: err });
      res.json({ message: "สมัครสมาชิกสำเร็จ", userId: results.insertId });
    }
  );
});

// ดึง game accounts
app.get("/api/game-accounts", (req, res) => {
  db.query("SELECT * FROM game_accounts", (err, results) => {
    if(err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// เพิ่ม game account
app.post("/api/game-accounts", (req, res) => {
  const { game_name, price } = req.body;
  db.query(
    "INSERT INTO game_accounts (game_name, price) VALUES (?, ?)",
    [game_name, price],
    (err, results) => {
      if(err) return res.status(500).json({ error: err });
      res.json({ message: "เพิ่มเกมสำเร็จ", accountId: results.insertId });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
