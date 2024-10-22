const client = require('prom-client');

// Create a registry for metrics
const register = new client.Registry();

// Define a few metrics
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [register],
});

const responseTime = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'Histogram of response times',
  registers: [register],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const activeConnectionsGauge = new client.Gauge({
    name: 'active_connections',
    help: 'Number of active connections',
    registers: [register],
  });

const cpuUsageGauge = new client.Gauge({
  name: 'cpu_usage_percentage',
  help: 'CPU usage in percentage',
  registers: [register],
});

const memoryUsageGauge = new client.Gauge({
    name: 'memory_usage_bytes',
    help: 'Memory usage in bytes',
    registers: [register],
});

const serviceUptimeGauge = new client.Gauge({
    name: 'service_uptime_seconds',
    help: 'Uptime of the service in seconds',
    registers: [register],
});

const httpErrorsTotal = new client.Counter({
    name: 'http_errors_total',
    help: 'Total number of HTTP errors',
    registers: [register],
});

const userRegistrationsTotal = new client.Counter({
    name: 'user_registrations_total',
    help: 'Total number of user registrations',
    registers: [register],
});
// Add more metrics as needed

// Export the metrics and registry
module.exports = {
    register,
    httpRequestsTotal,
    responseTime,
    activeConnectionsGauge,
    cpuUsageGauge,
    memoryUsageGauge,
    serviceUptimeGauge,
    httpErrorsTotal,
    userRegistrationsTotal,
  };
