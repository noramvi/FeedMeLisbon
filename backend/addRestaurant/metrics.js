// metrics.js
const promClient = require('prom-client');

const register = new promClient.Registry();

// Legg til standard metrikker
promClient.collectDefaultMetrics({ register });

// Counter for HTTP request count
const httpRequestCount = new promClient.Counter({
  name: 'http_request_count_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route']
});

// Histogram for request duration (latency)
const httpRequestDurationSeconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Counter for HTTP errors
const httpErrorCount = new promClient.Counter({
  name: 'http_error_count_total',
  help: 'Count of HTTP errors',
  labelNames: ['method', 'route', 'status_code']
});

// Gauge for active connections
const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

// Histogram for database query duration
const dbQueryDuration = new promClient.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation']
});

// Export all the metrics
module.exports = {
  register,
  httpRequestCount,
  httpRequestDurationSeconds,
  httpErrorCount,
  activeConnections,
  dbQueryDuration
};

