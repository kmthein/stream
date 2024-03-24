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

router.post("/upload", upload.single("video"), productController.uploadVideo)

router.post("/new-video", upload.single("thumbnails"), productController.submitUploadNewVideo)

module.exports = router;