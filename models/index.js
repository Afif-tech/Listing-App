const { Sequelize } = require("sequelize");
const { userModel } = require("./users");
const { listingModel } = require("./listings");
require("dotenv").config

const db = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    dialect: "mysql",
});

const User = userModel(db);
const Listing = listingModel(db);

User.hasMany(Listing, { foreignKey: 'user_id', onDelete: 'CASCADE'});
Listing.belongsTo(User, { foreignKey: 'user_id'});

module.exports = { db, User, Listing };