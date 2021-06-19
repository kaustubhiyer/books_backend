const path = require("path");

const express = require("express");

const productsController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", productsController.getIndex);

router.get("/products", productsController.getProducts);

router.get("/products/:productId", productsController.getProduct);

router.get("/cart", isAuth, productsController.getCart);

router.post("/cart", isAuth, productsController.postCart);

router.post(
  "/cart-delete-item",
  isAuth,
  productsController.postCartDeleteProduct
);

router.get("/orders", isAuth, productsController.getOrders);

router.post("/create-order", isAuth, productsController.createOrder);

module.exports = router;
