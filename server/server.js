const express = require("express");
const session = require("express-session");
const cors = require("cors");
const Login = require("./Routes/login.js");
const logout = require("./Routes/logout.js");
const addproduct = require("./Routes/addproduct.js")
const register = require("./Routes/register.js");
const me = require("./Routes/me.js")
const MongoStore = require("connect-mongo"); // สำหรับเก็บ session ลง MongoDB
const PORT = 3600;

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

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

//Add product
app.use("/api/addproduct",addproduct);

//Regiser
app.use("/api/register",register);

//Login
app.use("/api/login",Login);

//Me
app.use("/api/me",me);

//Logout
app.use("/api/logout",logout);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
