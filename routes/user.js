const express = require("express");
const {
    createUser,
    getUsers,
    getMatch,
    getRahulJamesMatch,
    getURL,
    getUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(createUser);
// router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/match/:id").get(getMatch);
router.route("/rahul").get(getRahulJamesMatch);
router.route("/match").get(getURL);

module.exports = router;
