const express = require('express');
const { getAndSaveTransaction , getBalance} = require('../controllers/methods.js')
const router = express.Router();

router.get('/transaction/:address', getAndSaveTransaction)

router.get("/balance/:address", getBalance)

router.get("/",(req,res)=>{res.send(`<h1>API ENDPOINTS</h1><p>/transaction/your address</p><h2> for transaction data</h2>
                <p>/balance/your address</p><h2> for balance</h2>`)})

module.exports = router