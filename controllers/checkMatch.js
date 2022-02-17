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

module.exports = {checkMatch}