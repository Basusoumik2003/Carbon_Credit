const express = require('express');
const router = express.Router();
const {
  createSolarEntry,
  getSolarPanelsByUser
} = require('../controllers/solarController');

router.post('/', createSolarEntry); // POST /api/solarpanel
router.get('/:userId', getSolarPanelsByUser); // GET /api/solarpanel/:userId

module.exports = router;
