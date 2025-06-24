const express = require('express');
const router = express.Router();
const { createEVEntry, getEVsByUser } = require('../controllers/EvController');

router.post('/', createEVEntry);         // POST /api/evmasterdata
router.get('/:userId', getEVsByUser);    // GET /api/evmasterdata/:userId

module.exports = router;
