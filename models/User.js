const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 25,
        },
        instaUserName: {
            type: String,
        },
        bio: {
            type: String,
        },
        regNo: {
            type: String,
            unique: true,
        },
        gender: {
            type: String,
        },
        "currently studying on": {
            type: String,
        },
        film: {
            type: String,
        },
        politics: {
            type: String,
        },
        sex: {
            type: String,
        },
        night: {
            type: String,
        },
        qualities: {
            type: Array,
        },
        music: {
            type: Array,
        },
        superpower: {
            type: String,
        },
        dress: {
            type: String,
        },
        drink: {
            type: String,
        },
        vert: {
            type: String,
        },
        smoke: {
            type: String,
        },
        food: {
            type: Array,
        },
        part_class: {
            type: Array,
        },
        drama: {
            type: String,
        },
        relationship: {
            type: String,
        },
        conversation: {
            type: Array,
        },
        part_behav: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
