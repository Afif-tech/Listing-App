const { Router } = require("express");
const { loginHandler, signupHandler, loginPage, signupPage, logoutHandler } = require("../controller/adminController");

const router = Router();

router.route("/login")
    .post(loginHandler)
    .get(loginPage);

router.route("/signup")
    .post(signupHandler)
    .get(signupPage);

router.route("/logout").get(logoutHandler);

module.exports = router;