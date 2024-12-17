const { Router } = require("express");
const { signupHandler, loginHandler } = require("../controller/userController");

const router = Router();

router.route("/signup").post(signupHandler);
router.route("/login").post(loginHandler);

module.exports = router;