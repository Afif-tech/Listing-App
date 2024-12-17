const asyncHandler = require("express-async-handler");
const { User, Listing } = require("../models");

const getListing = asyncHandler( async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'a') {
        return res.redirect("/admin/login");
    }

    const userId = req.session.user.id

    const user = await User.findByPk(userId, {
        include: [{
            model: Listing,
            attributes: ['id', 'name', 'latitude', 'longitude']
        }]
    });
    
    const listings = user.Listings || [];
    
    return res.render("admin_dashboard", { user, listings });    
});

const addListing = asyncHandler( async (req, res) => {
    const user_id = req.session.user.id;

    const longitude = parseFloat(req.body.longitude);
    const latitude = parseFloat(req.body.latitude);

    if (isNaN(longitude) || isNaN(latitude)) {
        return res.send('Invalid longitude or latitude input');
    }


    const listing = new Listing({
        name: req.body.name,
        latitude,
        longitude,
        user_id
    });

    await listing.save();
    res.redirect("/listing/admin");
});

const addListingPage = asyncHandler( async ( req, res ) => {
    const id = req.session.user.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.redirect("/admin/login")
    }
    res.render("add_listing");
});

const updateListing = asyncHandler(async (req, res) => {
    const userId = req.session.user.id;
    console.log(`User ID for update list ${userId}`);
    const listingId = req.params.id;
    console.log(`List ID for update list ${listingId}`);

    const listing = await Listing.findOne({
        where: { id: listingId, user_id: userId }
    });
    console.log(listing);
    if (!listing) {
        req.session.message = {
            type: 'danger',
            message: 'Listing not found or unauthorized access.',
        };
        return res.redirect("/listing/admin");
    }

    const newList = await listing.update({
        name: req.body.name,
        latitude: req.body.latitude ,
        longitude: req.body.longitude
    });

    if (newList) {
        req.session.message = {
            type: 'success',
            message: 'User updated successfully!',
        };
        return res.redirect("/listing/admin");
    } else {
        req.session.message = {
            type: 'danger',
            message: 'All input is required!',
        };
        return res.redirect(`/listing/admin/edit-list/${listingId}`);
    }
    
});

const updateListingPage = asyncHandler( async ( req, res )=> {
    const listingId = req.params.id;
    const userId = req.session.user.id;

    if(!(userId && listingId)) {
        return res.redirect("/listing/admin");
    }
    
    const listing = await Listing.findOne({
        where: { id: listingId, user_id: userId }
    });
    
    res.render("update_listing", { listing });
});

const deleteListing = asyncHandler( async ( req, res) => {
    const listingId = req.params.id;
    const userId = req.session.user.id;

    const listing = await Listing.findOne({ where: { id: listingId, user_id: userId } });
    if (!listing) {
        req.session.message = {
            type: 'danger',
            message: 'Unable to delete listing!',
        };
        return res.redirect('/listing/admin');
    }

    await listing.destroy();

    req.session.message = {
        type: 'success',
        message: 'Listing deleted successfully!',
    };
    return res.redirect('/listing/admin');
});

module.exports = { getListing, addListing, addListingPage, updateListing, updateListingPage, deleteListing };