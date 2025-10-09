const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hash });
    await newUser.save();
    res.json({ msg: "Registered!", username: newUser.username }); // 👈 ส่งกลับ username ด้วย
  } catch (err) {
    res.status(400).json({ msg: "Error", error: err.message });
  }
});

module.exports = router;