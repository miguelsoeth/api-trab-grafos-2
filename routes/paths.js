const express = require('express');
const { findCheapestPath } = require('../controllers/pathsController');

const router = express.Router();

router.post('/', findCheapestPath);

module.exports = router;
