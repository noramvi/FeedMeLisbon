// server.js
const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');
const pool = require('./config/db'); 

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Bruk restaurant-rutene
app.use('/api', restaurantRoutes);

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
