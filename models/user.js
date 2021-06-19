const mongoose = require("mongoose");
const product = require("./product");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true },
      },
    ],
  },
});

user.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((p) => {
    return p.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].qty += 1;
  } else {
    updatedCartItems.push({
      productId: product._id,
      qty: 1,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

user.methods.removeFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== prodId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model("User", user);
