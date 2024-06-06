const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const {
    test
} = require(path.join(__dirname, "..", "controllers", "miscellaneousController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.get("/", test);

module.exports = router;