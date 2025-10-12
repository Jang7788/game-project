const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;