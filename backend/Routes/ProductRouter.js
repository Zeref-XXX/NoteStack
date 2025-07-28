const ensureAuthenticated = require('../Middleware/Auth');

const router = require('express').Router();


router.get('/',ensureAuthenticated,(req,res)=>{ 
    res.status(200).json([
        {
            name:"mobile",
            price:3000
        },
        {
            name:"laptop",
            price:4000
        }
    ])
})



module.exports = router