const { ObjectId } = require("mongodb");
const { getDb } = require("../util/db");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  getCart() {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: { $in: this.cart.items.map((item) => item.productId) } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            qty: this.cart.items.find(
              (i) => i.productId.toString() === product._id.toString()
            ).qty,
          };
        });
      });
  }

  removeFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((i) => {
      return i.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addToCart(product) {
    const currentProduct = this.cart.items.findIndex((p) => {
      return p.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (currentProduct >= 0) {
      newQuantity = this.cart.items[currentProduct].qty + 1;
      updatedCartItems[currentProduct].qty = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        qty: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  createOrder() {
    const db = getDb();
    return this.getCart().then((products) => {
      const order = {
        items: products,
        user: {
          _id: new ObjectId(this._id),
          name: this.name,
        },
      };
      return db
        .collection("orders")
        .insertOne(order)
        .then((res) => {
          this.cart = { items: [] };
          return db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: this.cart } }
            );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
