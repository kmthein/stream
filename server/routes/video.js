const router = require("express").Router();
const multer = require("multer");

const productController = require("../controllers/video");

const storageConfigure = multer.diskStorage({
    filename: (req, file, cb) => {
      const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, suffix + "-" + file.originalname);
    },
  });

const upload = multer({ storage: storageConfigure });

router.post("/upload", upload.single("thumbnails"), upload.single("video"), productController.uploadVideo)

module.exports = router;