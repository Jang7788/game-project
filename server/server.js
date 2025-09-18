const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // ใส่ password MySQL ถ้ามี
  database: "game-project" // ชื่อ database
});

db.connect(err => {
  if(err) {
    console.log("❌ MySQL connection error:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

// GET all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if(err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "กรุณากรอก username และ password" });
  }

  // ตรวจสอบ username และ password
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดของเซิร์ฟเวอร์" });
    }

    if (results.length > 0) {
      return res.json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
        user: results[0], // ส่งข้อมูล user กลับไป เช่น role, id
      });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "username หรือ password ไม่ถูกต้อง" });
    }
  });
});

// POST register
app.post("/api/register", (req, res) => {
  const { username, password, role } = req.body;
  
  if(!username || !password) {
    return res.status(400).json({ error: "กรุณากรอก username และ password" });
  }

  db.query(
    "INSERT INTO user (username, password, role) VALUES (?, ?, ?)",
    [username, password, role || "user"],
    (err, results) => {
      if(err) return res.status(500).json({ error: err });
      res.json({ message: "สมัครสมาชิกสำเร็จ", userId: results.insertId });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
