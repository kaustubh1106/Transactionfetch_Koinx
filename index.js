const express = require('express');

const {connectMongoDB} = require("./connection.js")
const {price} = require("./utils/priceFetch.js")
const userRouter = require("./routes/transactionRoutes.js")

const app = express();

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

connectMongoDB(`mongodb+srv://${process.env.USERNAME}:${process.env.DB_PASS}@cluster0.pch41pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => { console.log("database connected") })
    .catch((e) => { console.log("monggo error", e) })


setInterval(price, 600000); // TASK 2: FETCH ETH PRICE EVERY TEN MINUTE
    


app.use("/", userRouter)

app.listen(3000, () => {
    console.log('server started');
})
