const express = require('express');

const {connectMongoDB} = require("./connection.js")
const {price} = require("./utils/priceFetch.js")
const userRouter = require("./routes/transactionRoutes.js")

const app = express();

const PORT =process.env.PORT || 3000

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

connectMongoDB(`${process.env.URL}`)
    .then(() => { console.log("database connected") })
    .catch((e) => { console.log("monggo error", e) })


setInterval(price, 600000); // TASK 2: FETCH ETH PRICE EVERY TEN MINUTE
    


app.use("/", userRouter)
 


app.listen(PORT, () => {
    console.log('server started');
})
