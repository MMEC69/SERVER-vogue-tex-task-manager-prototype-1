const express = require("express");
const router = express.Router();
const cors = require("cors");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3001"
    })
);

const {
    test
} = require("../controllers/miscellaneousController.js");

router.get("/", test);

module.exports = router;