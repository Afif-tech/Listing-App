const asyncHandler= require("express-async-handler");
const bcryptjs = require('bcryptjs');
const { User } = require("../models");

const signupHandler = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!(name && email && password)) {
        throw new Error("Warning: username, email, and password are required");
    }

    const role_type = 'a';
    await User.create({ 
        name,
        email,
        password,
        role_type
    });
    res.redirect("/admin/login");
});

const signupPage = asyncHandler( async ( req, res )=> {
    res.render("index_signup");
})

const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!(email && password)) {
        throw new Error("Warning: Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("Warning: Invalid email or password");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Warning: Invalid email or password");
    }

    req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_type,
    };

    if (user.role_type === 'a') {
        console.log("user verified")
        res.redirect("/listing/admin");
        
    } 
    else {
        return res.redirect("/admin/login")
    }
});

const loginPage = asyncHandler( async ( req, res ) => {
    const isLoggedIn = req.session.user ? true : false;
    res.render('index', { isLoggedIn });
});

const logoutHandler = asyncHandler( async ( req, res ) => {
    req.session.destroy();
    
    res.redirect("/admin/login");
    
});

module.exports = { signupHandler, loginHandler, loginPage, signupPage, logoutHandler };