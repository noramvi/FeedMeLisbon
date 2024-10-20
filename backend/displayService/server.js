// server.js
const express = require('express');
const cors = require('cors');
const displayRoutes = require('./routes/displayRoutes');
const pool = require('./config/db'); 
const port = 3002;
const path = require('path')


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', displayRoutes);
app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Adjust this path as needed
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});