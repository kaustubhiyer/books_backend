const { Sequelize } = require("sequelize");

const sequelize = require("../util/db");

const CartItem = sequelize.define("cartitem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qty: Sequelize.INTEGER,
});

module.exports = CartItem;
