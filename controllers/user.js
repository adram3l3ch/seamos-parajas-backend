const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
    console.log(req.body);
    const user = await User.create({ ...req.body });
    console.log(user);
    res.status(StatusCodes.CREATED).json({ id: user._id });
};

module.exports = { createUser };
