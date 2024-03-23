require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const videoRoute = require("./routes/video");
const multer = require("multer");
const path = require("path")

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

const app = express();

app.use(cors( { origin: "*" }));
app.use(bodyParser.json());


app.use(
  cookieSession({
    name: "session",
    keys: ["kmthein"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fileFilterVideo = (req, file, cb) => {
  // Accept video files only
  if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
      return cb(new Error('Only video files are allowed!'), false);
  }
  cb(null, true);
};

// app.use(
//   multer({ storage: storageConfigure }).array("video", 5)
// );


app.use("/auth", authRoute);
app.use("/video", videoRoute);

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/Images")
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const upload = multer({storage})

// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log(req.body)
//   console.log(req.file)
// })

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to db and server is running on ${PORT}`);
  });
});
