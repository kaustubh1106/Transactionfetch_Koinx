const mongoose = require("mongoose")


const schema = mongoose.Schema({
    userAddress: String,
    blockNumber: String,
    timeStamp: Number,
    hash: String,
    nonce: Number,
    transactionIndex: Number,
    from: String,
    to: String,
    value: Number,
    gas: Number,
    gasPrice: Number,
    isError: Number,
    txreceipt_status: Number,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: Number,
    gasUsed: Number,
    confirmations: Number,
    methodId: String,
    functionName: String
})

module.exports = mongoose.model("transactions", schema)