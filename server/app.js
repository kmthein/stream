require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["kmthein"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.authenticate("session"));

app.use("/auth", authRoute);

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
