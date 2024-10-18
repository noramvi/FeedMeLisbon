const express = require('express');
const cors = require('cors');
const app = express();
const ratingRoutes = require('./routes/ratingRoutes'); // Legg til ruten for rating

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Definer dine ruter
app.use('/api', ratingRoutes);

// Start serveren
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
