const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const { body } = require("express-validator/check");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  [
    body("title").isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 400 }),
  ],
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 400 }),
  ],
  isAuth,
  adminController.postAddProduct
);

module.exports = router;
