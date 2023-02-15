const path = require("path");

const express = require("express");
const { body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const authCheck = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", authCheck, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", authCheck, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 400 }).trim(),
  ],
  authCheck,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  authCheck,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 400 }).trim(),
  ],
  authCheck,
  adminController.postEditProduct
);

router.delete("/product/:productId", authCheck, adminController.deleteProduct);

module.exports = router;
