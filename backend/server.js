const express = require('express');
const app = express();
const port = 3000; // Port number

// Middleware to parse JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes
const restaurantRoutes = require('./routes/restaurant');
app.use('/api', restaurantRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});