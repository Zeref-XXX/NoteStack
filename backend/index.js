const express = require('express')
const app = express()
require('dotenv').config();
require('./models/db');
const bodyparser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter') 
const action=require('./Routes/Actions');

// app.use(
//   cors({
//     origin: "*", // Your frontend URL
//   })
// );
const corsOptions = {
  origin: ['http://localhost:1234', 'https://your-production-frontend.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 4000;

app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("working")
})

app.use('/auth', AuthRouter); 
app.use('/action',action);

app.listen(PORT, () => {
    console.log(" listning at  ", PORT)
})