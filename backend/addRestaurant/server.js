const express = require('express');
const cors = require('cors');
const displayRoutes = require('./routes/restaurantRoutes');
const path = require('path');
const client = require('prom-client'); // Importer prom-client


const app = express();
const port = 3004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/api', displayRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Opprett en registry for metrikker
const register = new client.Registry();

// Legg til standard metrikker
client.collectDefaultMetrics({
    register: register,
    labels: { job: 'addrestaurant-service' } // Passer på at dette job-navnet matcher prometheus.yml
  });

// Lag en ny gauge-metrikk som du kan bruke i applikasjonen
const exampleMetric = new client.Gauge({
  name: 'example_metric',
  help: 'This is an example metric',
  registers: [register],
});

// Opprett en endpoint for metrikker
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
