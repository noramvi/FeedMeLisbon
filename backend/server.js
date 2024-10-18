const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware for å parse JSON
app.use(express.json());
const cors = require('cors'); // Legg til denne linjen

app.use(cors());

// Opprett en MySQL-tilkobling
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Brukernavn for MySQL
    password: 'geiksmysql299', // Passord for MySQL (pass på at du har satt det riktig)
    database: 'feedMe' // Navnet på databasen din
});

// Koble til databasen
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// Hent alle restauranter
app.get('/api/restaurants', (req, res) => {
    const query = 'SELECT * FROM Restaurant';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// Hent restauranter basert på type 
app.get('/api/breakfast', (req, res) => {
    const query = 'SELECT * FROM Restaurant WHERE Type = "Breakfast"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching breakfast data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/lunch', (req, res) => {
    const query = 'SELECT * FROM Restaurant WHERE Type = "Lunch"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching lunch data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/dinner', (req, res) => {
    const query = 'SELECT * FROM Restaurant WHERE Type = "Dinner"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching dinner data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/dessert', (req, res) => {
    const query = 'SELECT * FROM Restaurant WHERE Type = "Dessert"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching dessert data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// Legg til ny restaurant
app.post('/api/restaurants', (req, res) => {
    const { name, location, type } = req.body;

    const query = 'INSERT INTO restaurants (name, location, type) VALUES (?, ?, ?)';
    connection.query(query, [name, location, type, rating], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(201).json({ id: results.insertId, name, location, type });
    });
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
