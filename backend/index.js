const express = require('express')
const app = express()
require('dotenv').config();
const bodyparser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter') 
const action = require('./Routes/Actions');

const allowedOrigins = ['http://localhost:1234', 'https://your-production-frontend.com'];

// Handle preflight requests for all routes
app.options('*', cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true
}));

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("working")
})

app.use('/auth', AuthRouter); 
app.use('/action', action);

app.listen(PORT, () => {
    console.log(" listening at ", PORT)
})
