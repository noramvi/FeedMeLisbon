const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ratingRoutes = require('./routes/ratingRoutes'); // Adjust path as necessary


const PORT = 3001;
const path = require('path')
const app = express();
// Use CORS middleware
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use('/api', ratingRoutes); // Mount your rating routes
app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Adjust this path as needed
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
