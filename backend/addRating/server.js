const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ratingRoutes = require('./routes/ratingRoutes'); // Adjust path as necessary

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1:8080', // Allow requests from your frontend origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true // Allow credentials if needed (for cookies, authorization headers, etc.)
}));

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use('/api', ratingRoutes); // Mount your rating routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
