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
    downloadAttachments
} = require("../controllers/downloadController");

router.get("/downloadAttachments/:fileName", downloadAttachments);

module.exports = router;