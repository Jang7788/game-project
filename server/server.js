const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo"); // สำหรับเก็บ session ลง MongoDB
const PORT = 5000;


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/auth_demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

app.use(
  session({
    secret: "sskibidi_toilet_1234_secret_keyfdsffgh21fgh21h2fg1",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/auth_demo" }),
    cookie: {
      httpOnly: true,
      secure: false, // true ถ้าใช้ HTTPS
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hash });
    await newUser.save();
    res.json({ msg: "Registered!" });
  } catch (err) {
    res.status(400).json({ msg: "Error", error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "No user" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ msg: "Wrong password" });

  req.session.user = { username: user.username, email: user.email };
  res.json({ msg: "Logged in!" });
});

app.get("/api/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ msg: "Not logged in" });
  res.json({ user: req.session.user });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ msg: "Logged out" });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
