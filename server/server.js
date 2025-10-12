const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo"); 
const fs = require("fs");
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
      secure: false,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

fs.readdirSync('./Routes')
  .filter(fileName => fileName.endsWith('.js')) 
  .forEach(fileName => {
    try {
      const route = require('./Routes/' + fileName);
      console.log(`Loading Route: ${fileName}`); 
      app.use('/api', route);
    } catch (err) {
      console.error(`Error loading route ${fileName}:`, err);
    }
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
