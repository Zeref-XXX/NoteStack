const express = require('express')
const app = express()
require('dotenv').config();
require('./models/db');
const bodyparser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter') 
const action=require('./Routes/Actions');


// app.use(cors({
//   origin: "*",
//   credentials:true
// }));
// app.use(cors());
app.use(
  cors({
    origin: "*", // Your frontend URL  ,
    credentials:true
  })
);

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