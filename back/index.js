const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const action = require('./Routes/Actions');

app.use(express.json());

app.use(cors({
    origin: ['https://note-stack-frontend.vercel.app', 'http://localhost:1234'],
    credentials: true 
}))


app.get('/', (req, res) => {
    res.send("API is working. Welcome!"); // More descriptive message
});

app.use('/auth', AuthRouter);
app.use('/action', action);



  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

module.exports = app;