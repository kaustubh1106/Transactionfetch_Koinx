const userModel = require("../models/model.js")

async function saveTransactionToMongo(log,_address){
    await userModel.create({
        userAddress: _address,
        blockNumber: log.blockNumber,
        timeStamp: Number(log.timeStamp),
        hash: log.hash,
        nonce: Number(log.nonce),
        transactionIndex: Number(log.transactionIndex),
        from: log.from,
        to: log.to,
        value: Number(log.value),
        gas: Number(log.gas),
        gasPrice: Number(log.gasPrice),
        isError: Number(log.isError),
        txreceipt_status: Number(log.txreceipt_status),
        input: log.input,
        contractAddress: log.contractAddress,
        cumulativeGasUsed: Number(log.cumulativeGasUsed),
        gasUsed: Number(log.gasUsed),
        confirmations: Number(log.confirmations),
        methodId: log.methodId,
        functionName: log.functionName
    });
}

module.exports = { saveTransactionToMongo }