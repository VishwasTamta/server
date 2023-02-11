const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

// get /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// get /admin/products
router.get("/products", adminController.getProducts);

// post /admin/add-product
router.post("/add-product", adminController.postNewProduct);

// router.get("/edit-product/:productId", adminController.getEditProduct);

// router.post("/edit-product", adminController.postEditProduct);

// router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
