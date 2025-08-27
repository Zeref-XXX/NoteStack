require('../models/db');
 
const router = require('express').Router();

const upload=require('../Actions/Upload');
const allDoc=require('../Actions/findAll');
const Card = require('../Actions/Card'); 
const getForkData = require('../Actions/ForkTracker');

router.post('/upload', upload);
router.get('/find',allDoc);
router.post('/card',Card);
router.get('/forks', getForkData);

module.exports = router;