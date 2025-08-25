require('../models/db');
 
const router = require('express').Router();

const upload=require('../Actions/Upload');
const allDoc=require('../Actions/findAll');
const Card = require('../Actions/Card'); 

router.post('/upload', upload);
router.get('/find',allDoc);
router.post('/card',Card);

module.exports = router;