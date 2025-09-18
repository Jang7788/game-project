const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const app = express();
const PORT = 3600;

app.use(cors());
app.use(express.json());


let swaggerDocument;
try {
  const file = fs.readFileSync(__dirname + '/swagger.yaml', 'utf8');
  swaggerDocument = YAML.parse(file);
} catch (err) {
  console.error("❌ Swagger load error:", err);
}

// Swagger UI
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'game_db'
});

db.connect(err => {
  if (err) {
    console.log('❌ MySQL connection error:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ msg: "Hello World" });
});

app.get('/register', (req, res) => {
  db.query('SELECT * FROM register', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// user id
app.get('/register/:id', (req, res) => {
  const userId = req.params.id; 
  db.query('SELECT * FROM register WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(results[0]);
  });
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Swagger docs at http://localhost:${PORT}/api-docs`);
});
