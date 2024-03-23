const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    scope: ["profile", "email", "https://www.googleapis.com/auth/youtube"],
  },
  function(accessToken, refreshToken, profile, callback) {
    callback(null, { accessToken, refreshToken, profile });
  }
));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});