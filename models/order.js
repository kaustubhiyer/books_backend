const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const order = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
});

module.exports = mongoose.model("Order", order);
