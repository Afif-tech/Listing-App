const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const userModel = (db) => {
    return db.define("User", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        role_type: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        hooks: {
            beforeSave: async(user) => {
                if (user.changed("password")) {
                    const salt = await bcryptjs.genSalt(10);
                    const hash = await bcryptjs.hash(user.password, salt);
                    user.password = hash;
                }
            }
        }
    })
};

module.exports = { userModel };