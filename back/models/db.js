const mongoose = require('mongoose');

const mongo_url = process.env.MONGO;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log('MongoDB Connect ion Error: ', err);
    })


