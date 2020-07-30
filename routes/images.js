const express = require("express");
const router = express.Router();

const config = require("config");
const upload = require("../middleware/fileUpload");

router.post("/", upload.single("images"), (req, res) => {
  if (!req.file) {
    return res.status(401).send("No file received");
  } else {
    const filePath =
      req.protocol +
      "://" +
      req.hostname +
      `:${config.get("port")}` +
      "/images/" +
      req.file.filename;

    // let result = []

    // req.files.forEach((file) => {
    //     result.push(
    //         req.protocol +
    //         "://" +
    //         req.hostname +
    //         `:${config.get("port")}` +
    //         "/images/" +
    //         file.filename
    //     );
    // });

    return res.send(filePath);
  }
});

module.exports = router;
