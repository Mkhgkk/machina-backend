const express = require("express");
const router = express.Router();

const config = require("config");
const upload = require("../middleware/fileUpload");

router.post("/", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(401).send("No file received");

    } else {
        const host = req.hostname;
        const filePath = req.protocol + "://" + host + `:${config.get('port')}` + '/images/' + req.file.filename;

        return res.send(filePath)
    }
})

module.exports = router;