const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const originURL = process.env.originURL;
const {
    downloadAttachments
} = require(path.join(__dirname, "..", "controllers", "downloadController"));

//middleware
router.use(
    cors({
        credentials: true,
        origin: originURL
    })
);

router.get("/downloadAttachments/:fileName", downloadAttachments);

module.exports = router;