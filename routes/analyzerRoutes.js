const express = require('express');
const { analyzeUrl } = require('../controllers/analyzerController');

const router = express.Router();
router.get('/', analyzeUrl);

module.exports = router;
