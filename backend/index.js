const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db');
const bodyparser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const action = require('./Routes/Actions');

// ✅ Proper CORS setup
const allowedOrigins = [
  "*",            // your dev frontend
  "https://note-stack.vercel.app"     // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Handle preflight requests
app.options("*", cors());

const PORT = process.env.PORT || 4000;

app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send("working");
});

app.use('/auth', AuthRouter);
app.use('/action', action);

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
