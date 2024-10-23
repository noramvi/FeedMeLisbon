const express = require('express');
const cors = require('cors');
const displayRoutes = require('./routes/displayRoutes');
const path = require('path');
const client = require('prom-client'); 
const metrics = require('./metrics');

const app = express();
const port = 3002;

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
// const register = new client.Registry();


app.use((req, res, next) => {
    if (req.path !== '/metrics') {
      metrics.httpRequestCount.inc({ method: req.method, route: req.route ? req.route.path : req.path });
      const end = metrics.httpRequestDurationSeconds.startTimer({ method: req.method, route: req.route ? req.route.path : req.path });
      
      res.on('finish', () => {
        end({ status_code: res.statusCode });
      });
  
      if (res.statusCode >= 400) {
        metrics.httpErrorCount.inc({ method: req.method, route: req.route ? req.route.path : req.path, status_code: res.statusCode });
      }
    }
  
    next();
  });

app.use((req, res, next) => {
    metrics.activeConnections.inc(); // Increment on new connection
  
    res.on('finish', () => {
      metrics.activeConnections.dec(); // Decrement when connection closes
    });
  
    next();
});

// Opprett en endpoint for metrikker
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
