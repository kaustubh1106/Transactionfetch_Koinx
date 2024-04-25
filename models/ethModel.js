const mongoose = require("mongoose")


const schema = mongoose.Schema({
    price: Number,
    date_time: String
})

module.exports = mongoose.model("eth_prices", schema)