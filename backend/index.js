const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db'); // Ensure this is optimized for serverless
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const action = require('./Routes/Actions');


// --- Middleware Setup ---

// 1. CORS Configuration (using an environment variable for production)
const allowedOrigins = [ "https://note-stack-front.vercel.app/signup"];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', '*'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// 2. Body Parser Middleware (modern way)
app.use(express.json());

// --- Route Definitions ---

app.get('/', (req, res) => {
    res.send("API is working. Welcome!"); // More descriptive message
});

app.use('/auth', AuthRouter);
app.use('/action', action);



// --- Server Setup ---
// Only start the server if we're not in a serverless environment
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

// --- Export the app for Vercel ---
module.exports = app;