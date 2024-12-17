const { DataTypes } = require("sequelize");

const listingModel = (db) => {
    return db.define("Listing", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE(20, 6),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE(20, 6),
            allowNull: false,
        }
    })
};

module.exports = { listingModel };