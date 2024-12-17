const asyncHandler = require("express-async-handler");

const signupHandler = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    const role_type = 'u'
    if (!(name && email && password)) throw new Error("Warning: username, email and password are required");
    await User.create({ 
        name,
        email,
        password,
        role_type
    });
    res.redirect("/admin/login");
});

const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
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

    if (user.role_type === 'u') {
        res.redirect("/listing/user");
    } else {
        res.redirect("/user/login")
    }
    
});

module.exports = { signupHandler, loginHandler };