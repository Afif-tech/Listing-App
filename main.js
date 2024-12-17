require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const { router } = require('./routers');
const path = require('path');
const { db } = require('./models');

const app = express();
const PORT = process.env.PORT || 5555;
const secret_key = process.env.SECRET_KEY;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.use(session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week in milliseconds
    }
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    res.locals.isLoggedIn = req.session.user ? true : false;
    delete req.session.message;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/", router);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/admin/login`)
    db.sync();
})