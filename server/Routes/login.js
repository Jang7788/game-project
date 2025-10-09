const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User")

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "No user" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ msg: "Wrong password" });

  req.session.user = { username: user.username, email: user.email };

  res.json({ msg: "Logged in!", user: req.session.user });
});

module.exports = router;