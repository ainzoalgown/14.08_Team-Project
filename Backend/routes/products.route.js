const { Router } = require("express");
const { productsController } = require("../controllers/categories.controller");

const router = Router();

router.post("/products", productsController.addProduct);
router.delete("/products/:productId", productsController.removeProduct);

router.get("/categories/:categoryId/products", productsController.getProductsByCategory);
router.get("/products",  productsController.getProducts);
router.get("/products/:productId", productsController.getProductById);

router.post("/products/:productId/reviews", productsController.addReview);
router.delete("/products/:productId/reviews/reviewId", productsController.removeReview);

module.exports = router;
