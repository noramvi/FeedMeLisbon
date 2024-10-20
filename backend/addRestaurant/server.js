// server.js
const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');
const pool = require('./config/db'); 


const port = 3000;
const path = require('path')
// Middleware
const app = express();
app.use(cors());

app.use(express.json());
// Bruk restaurant-rutene
app.use('/api', restaurantRoutes);
app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Adjust this path as needed
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
