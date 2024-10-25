const express = require('express');
const cors = require('cors');
const displayRoutes = require('./routes/displayRoutes'); 
const client = require('prom-client'); 

const app = express();
const port = 3002;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCount = new client.Counter({
    name: 'http_request_count',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route'],
});

const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});

const httpErrorCount = new client.Counter({
    name: 'http_error_count',
    help: 'Total number of HTTP errors',
    labelNames: ['method', 'route', 'status_code'],
});

register.registerMetric(httpRequestCount);
register.registerMetric(httpRequestDurationSeconds);
register.registerMetric(httpErrorCount);

app.use(cors());
app.use(express.json());

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

app.use('/api', displayRoutes);


app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
