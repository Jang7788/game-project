const mongoose = require('mongoose');
const { type } = require('@testing-library/user-event/dist/type');

const userConn = mongoose.createConnection("mongodb://127.0.0.1:27017/auth_demo");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = userConn.model("User",userSchema);

module.exports = User;