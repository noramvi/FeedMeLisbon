const express = require('express');
const cors = require('cors');
const ratingRoutes = require('./routes/ratingRoutes'); // Endre dette til den aktuelle ruten
const path = require('path');
const client = require('prom-client'); // Importer prom-client

const app = express();
const port = 3001;

// Opprett en registry for metrikker
const register = new client.Registry();

// Legg til standard metrikker
client.collectDefaultMetrics({ register });

// Lag en ny Counter-metrikk for HTTP-forespørselene
const httpRequestCount = new client.Counter({
    name: 'http_request_count',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route'],
});

// Lag en ny Histogram-metrikk for varighet av HTTP-forespørslene
const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});

// Lag en ny Counter-metrikk for HTTP-feil
const httpErrorCount = new client.Counter({
    name: 'http_error_count',
    help: 'Total number of HTTP errors',
    labelNames: ['method', 'route', 'status_code'],
});

// Registrer metrikker
register.registerMetric(httpRequestCount);
register.registerMetric(httpRequestDurationSeconds);
register.registerMetric(httpErrorCount);

// Middleware
app.use(cors());
app.use(express.json());

// Middleware for å spore HTTP-forespørslene
app.use((req, res, next) => {
    if (req.path !== '/metrics') {
        httpRequestCount.inc({ method: req.method, route: req.path });
        const end = httpRequestDurationSeconds.startTimer();

        res.on('finish', () => {
            end({ status_code: res.statusCode });
        });

        if (res.statusCode >= 400) {
            httpErrorCount.inc({ method: req.method, route: req.path, status_code: res.statusCode });
        }
    }
    next();
});

// Routes
app.use('/api', ratingRoutes);

// Opprett en endpoint for metrikker
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});