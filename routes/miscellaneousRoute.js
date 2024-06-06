const express = require("express");
const router = express.Router();
const cors = require("cors");
const originURL = process.env.originURL;

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

const {
    test
} = require("../controllers/miscellaneousController.js");

router.get("/", test);

module.exports = router;