const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const checkMatch = require("./checkMatch.js")

const createUser = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ id: user._id });
};

const getUsers = async (req, res) => {
    const user = await User.find();
    res.status(StatusCodes.OK).json({ ...user });
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user.name);
    res.status(StatusCodes.OK).json(user);
};



const getMatch = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const allUsers = await User.find();
    const oppositeGenders = allUsers.filter(
        (currentUser) => currentUser.gender !== user.gender
    );
    const matches = oppositeGenders.map((oppositeGender) =>
        checkMatch(oppositeGender, user)
    );

    const firstFive = matches.sort((i, j) => j.percent - i.percent).slice(0, 5);
    res.status(StatusCodes.OK).json(firstFive);
};




module.exports = {
    createUser,
    getUsers,
    getMatch,
    getUser,
};
