//dependencies

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");

//security dependencies

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialisation

const app = express();
const PORT = process.env.PORT || 5000;

//Routes

const userRouter = require("./routes/user");

//middlewares

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ msg: "welcome" });
});

//routes

app.use("/api/v1/user", userRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
