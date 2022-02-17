const express = require("express");
const {
    createUser,
    getMatch,
    getUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").post(createUser);
router.route("/match/:id").get(getMatch);
router.route("/:id").get(getUser);

module.exports = router;
