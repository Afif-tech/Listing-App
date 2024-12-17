const { Router } = require("express");
const { getListing, addListing, addListingPage, updateListing, updateListingPage, deleteListing } = require("../controller/listingController");

const router = Router();

router.route("/admin").get(getListing);

router.route("/admin/add-list")
    .get(addListingPage)
    .post(addListing);

router.route("/admin/edit-list/:id")
    .get(updateListingPage)
    .post(updateListing);

router.route("/admin/delete-list/:id").post(deleteListing);

router.route("/user").get(getListing); // for front end team

module.exports = router
    