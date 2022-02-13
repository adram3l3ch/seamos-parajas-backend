const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

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
    res.status(StatusCodes.OK).json(user);
};

const checkMatch = (oppositeGender, user) => {
    let matchingPercent = 0;
    let totalPercent = 0;

    if (!user.part_class.includes(oppositeGender["currently studying on"])) {
        return {
            totalcond: totalPercent,
            matchingcond: matchingPercent,
            percent: 0,
            ...oppositeGender._doc,
        };
    }
    [
        "film",
        "politics",
        "sex",
        "night",
        "superpower",
        "dress",
        "drama",
        "relationship",
        "part_behave",
    ].forEach((i) => {
        if (oppositeGender[i] === user[i]) matchingPercent++;
        totalPercent++;
    });

    user.music.forEach((i) => {
        if (oppositeGender.music.includes(i)) matchingPercent++;
        totalPercent++;
    });

    if (
        user.food.includes("I will eat anything") ||
        oppositeGender.food.includes("I will eat anything")
    ) {
        matchingPercent =
            matchingPercent + Math.max(user.food.length, oppositeGender.food.length);
        totalPercent =
            matchingPercent + Math.max(user.food.length, oppositeGender.food.length);
    } else {
        user.food.forEach((i) => {
            if (oppositeGender.food.includes(i)) matchingPercent++;
            totalPercent++;
        });
    }

    user.conversation.forEach((i) => {
        if (oppositeGender.conversation.includes(i)) matchingPercent++;
        totalPercent++;
    });

    user.qualities.forEach((i) => {
        if (i.toLowerCase() === "extrovert" && oppositeGender.vert === "extrovert") {
            matchingPercent++;
        }
        totalPercent++;
        if (i.toLowerCase() === "introvert" && oppositeGender.vert === "introvert") {
            matchingPercent++;
        }
        if (
            i.toLowerCase() !== "introvert" &&
            i.toLowerCase() !== "extrovert" &&
            oppositeGender.vert === "ambivert"
        ) {
            matchingPercent++;
        }
        if (i.toLowerCase() === "smoker" && oppositeGender.smoke === "yes") {
            matchingPercent++;
        }
        if (i.toLowerCase() === "drinker" && oppositeGender.drink === "yes") {
            matchingPercent++;
        }
        if (i.toLowerCase() === "non-smoker" && oppositeGender.smoke !== "yes") {
            matchingPercent++;
        }
        if (i.toLowerCase() === "non-drinker" && oppositeGender.drink !== "yes") {
            matchingPercent++;
        }
        totalPercent++;
    });

    return {
        totalcond: totalPercent,
        matchingcond: matchingPercent,
        percent: (matchingPercent / totalPercent) * 100,
        ...oppositeGender._doc,
    };
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

const getRahulJamesMatch = async (req, res) => {
    const allUsers = await User.find();
    const arr = [];

    allUsers.map((oneUser) => {
        const oppositeGenders = allUsers.filter(
            (currentUser) => currentUser.gender !== oneUser.gender
        );
        const match = oppositeGenders.map((op) => {
            return checkMatch(op, oneUser);
        });
        match
            .sort((i, j) => j.percent - i.percent)
            .forEach((a, i) => {
                if (i < 20) {
                    if (a.regNo === "PRN19EC027") arr.push({ name: oneUser.name });
                }
            });
    });
    res.status(StatusCodes.OK).json(arr.slice(0, 5));
};

const getURL = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json(
        users.map((user) => ({
            name: user.name,
            regNo: user.regNo,
            id: user._id,
        }))
    );
};

module.exports = {
    createUser,
    getUsers,
    getMatch,
    getRahulJamesMatch,
    getURL,
    getUser,
};
