// server.js
const express = require('express');
const cors = require('cors');
const displayRoutes = require('./routes/displayRoutes');
const pool = require('./config/db'); 

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', displayRoutes);

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});