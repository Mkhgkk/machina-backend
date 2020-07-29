const express = require("express");
const router = express.Router();

const config = require("config");
const upload = require("../middleware/fileUpload");

router.post("/", upload.array('images', 20), (req, res) => {
    if (!req.files) {
        return res.status(401).send("No file received");

    } else {

        let result = []

        req.files.forEach((file) => {
            result.push(
                req.protocol +
                "://" +
                req.hostname +
                `:${config.get("port")}` +
                "/images/" +
                file.filename
            );
        });

        return res.send(result)
    }
})

module.exports = router;