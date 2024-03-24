const router = require("express").Router();
const passport = require("passport");

const User = require("../models/user");

const authController = require("../controllers/auth");

const authMiddleware = require("../middlewares/is-auth");

router.post("/user-register", authController.register);

router.post("/user-login", authController.login);

router.get("/login/success", (req, res) => {
	if (req.user) {
		const { email, name, picture } = req.user.profile._json;
		User.findOne({email}).then((user) => {
			if(!user) {
				return User.create({
					name,
					email,
					picture
				})
			}
		})
		return res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({	
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

router.get("/get-user", authMiddleware, authController.checkCurrentUser);

module.exports = router;