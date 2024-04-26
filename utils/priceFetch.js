const axios = require('axios');
const ethModel = require("../models/ethModel")


const price = async () => {
    const date = new Date();
    const timestamp = date.getTime()
    const date_time = Date(timestamp)
    const eth_price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`)
    await ethModel.create({
        price: Number(eth_price.data.ethereum.inr),
        date_time: date_time
    })
    console.log(eth_price.data.ethereum.inr)
}

module.exports = {price}