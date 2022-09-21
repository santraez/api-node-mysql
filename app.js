const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

////////////////////////////////////////
// SERVER CONFIGURATION
////////////////////////////////////////

// EXPRESS
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MIDDELWARES
app.use(bodyParser.json());
app.use(cors());

////////////////////////////////////////

////////////////////////////////////////
// DATABASE CONNECTION
////////////////////////////////////////

// CONNECT TO MYSQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'test'
});

// CHECK CONNECTION
connection.connect(err => {
  if (err) throw err;
  console.log('Database server running!');
});

////////////////////////////////////////

////////////////////////////////////////
// API ENDPOINTS
////////////////////////////////////////

// APP
app.get('/', (req, res) => {
  res.send('CRUD NodeJS-MySQL');
});

// READ ALL
app.get('/api', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    };
  });
});

// READ BY ID
app.get('/api/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    };
  });
});

// CREATE
app.post('/api', (req, res) => {
  const sql = 'INSERT INTO users SET ?';
  const userObj = {
    name: req.body.name,
    email: req.body.email
  };
  connection.query(sql, userObj, error => {
    if (error) throw error;
    res.send('User created!');
  });
});

// UPDATE
app.put('/api/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send('User updated!');
  });
});

// DELETE
app.delete('/api/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send('User deleted!');
  });
});

////////////////////////////////////////