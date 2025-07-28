
const express = require('express');
const serverless = require('serverless-http');        // Wrap Express for Vercel
const cors = require('cors');
require('dotenv').config();
require('../models/db');                  // Initialize DB

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://your-frontend.vercel.app',
  'http://localhost:1234'
];
const corsOptions = {
  origin: (origin, callback) =>
    !origin || allowedOrigins.includes(origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS')),
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));                           // Apply CORS globally
app.options('*', cors(corsOptions));                  // Preflight support
app.use(express.json());                              // Body parsing

// Route imports
const authRouter = require('../src/routes/auth.routes');

// Mount routers
app.use('/auth', authRouter);

// Health-check
app.get('/', (req, res) => res.send('API is working'));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
