const axios = require('axios');
const userModel = require("../models/model.js")
const { saveTransactionToMongo } = require("../utils/saveTransaction.js")


//TASK 1: GET AND SAVE TRANSACTION TO THE DATABASE
async function getAndSaveTransaction(req, res) {
    const _address = req.params.address;
    console.log(_address)
    try {
        const user = await userModel.findOne({ userAddress: _address })
        //CHECKS IF THERE IS ANY ENTRY PRESENT CORRESPONDING TO GIVEN ADDRESS
        if (user) {
            //if YES                 
            const lastdata = await userModel.find({ userAddress: _address });
            const timestamp1 = lastdata[lastdata.length - 1].timeStamp
            console.log(timestamp1)
            const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${_address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${process.env.ETHSCAN_API_KEY}`);
            const transactions = response.data.result;
            let lastindex = transactions.length - 1
            console.log(transactions[lastindex].timeStamp)
            if (timestamp1 < transactions[lastindex].timeStamp) {
                //IF THERE IS MORE TRANSACTION ADDED AFTER LAST UPDATE IF YES THEN ADD TO DATABASE
                const sliced = transactions.slice(lastdata.length)

                saveTransactionToMongo(sliced, _address)

                console.log("transaction updated!!!")
                res.send(response.data.result)
            }
            else {
                res.send(lastdata)
                console.log("already updated!!!")
            }

        } else {
            //step 3: if not 
            //step 3.1: then save the res in mongodb
            const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${_address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${process.env.ETHSCAN_API_KEY}`);
            const transactions = response.data.result;


            saveTransactionToMongo(transactions, _address)


            res.send(transactions)
            // const db_res = await userModel.find({userAddress : _address})
            console.log("Transaction data saved!");

        }
    } catch (error) {
        console.error("Error:", error);
    }
}


// TASK 3: GET API FOR BALANCE CHECKING AND CURRENT ETHER PRICE IN INR
async function getBalance(req, res) {
    const _address = req.params.address
    let balance = 0;
    const ethprice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`)
    console.log(ethprice.data.ethereum.inr)
    try {
        const res_add = await userModel.findOne({ userAddress: _address })
        if (!res_add) {
            await getAndSaveTransaction(req, res)
        }
        else {
            const res_from = await userModel.find({ from: _address })
            const res_to = await userModel.find({ to: _address })
            for (const log of res_to) {
                balance += log.value
            }
            for (const log of res_from) {
                balance -= log.value
            }
            console.log(balance * 1e-18)
        }
    } catch (e) {
        console.log("error: ", e)
    }
    res.send(`<h1>Account Address: </h1><span>${_address}</span><h1>current balance:<h1/><span> ${balance * 1e-18} ethers</span><h1>ether price (in inr):<h1/><span> ${ethprice.data.ethereum.inr} </span>`)
}

module.exports = { getAndSaveTransaction, getBalance }