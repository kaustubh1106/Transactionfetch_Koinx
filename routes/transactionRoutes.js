const express = require('express');
const { getAndSaveTransaction , getBalance} = require('../controllers/methods.js')
const router = express.Router();

router.get('/transaction/:address', getAndSaveTransaction)

router.get("/balance/:address", getBalance)


module.exports = router