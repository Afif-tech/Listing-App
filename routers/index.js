const express = require('express');
const router = express.Router();
const adminRouter = require("./adminRouter")
const userRouter = require("./userRouter")
const listingRouter = require("./listingRouter")

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/listing", listingRouter);

module.exports = {router};