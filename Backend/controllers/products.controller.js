const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const { extname } = require("path");

module.exports.productsController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find().populate("category");
      res.json(products);
    } catch {
      res.json({ error: "Could not get the list of products" });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const products = await Product.find({
        category: req.params.categoryId,
      }).populate("category");
      res.json(products);
    } catch {
      res.json({ error: "Could not get the list of products" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId).populate("category");
      res.json(product);
    } catch {
      res.json({ error: "Could not get the list of products" });
    }
  },

  addProduct: async (req, res) => {
    try {
      let image = req.body.image ? req.body.image : req.files.image;
      if (typeof image === "object") {
        const imageFile = req.files.image;
        const ext = extname(imageFile.name);
        const newName = "/images/" + Math.random() + ext;

        await imageFile.mv(`./public${newName}`);
        image = newName;
      }
      const { name, category, price } = req.body;
      await Product.create({ name, category, price, image });

      res.send("Product added successfully");
    } catch {
      res.json({ error: "Провал" });
    }
  },

  removeProduct: async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.productId);
      await Review.deleteMany({ productId: req.params.productId });

      res.send("Product has been deleted from DB");
    } catch {
      res.json({ error: "Не удалось получить список продуктов" });
    }
  },


  addReview: async (req, res) => {
    try {
      const { text, author } = req.body;
      const { productId } = req.params;
      const newReview = await Review.create({ author, text, productId });
      await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview._id }});

      res.send("Review has been successfully added");
    } catch {
      res.json({ error: "Не удалось добавить комментарий"});
    }
  },

  removeReview: async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.reviewId);
      await Product.updateMany(
        { reviews: req.params.reviewId }, { $pull: {reviews: req.params.reviewId } } );
      res.send("Review has been deleted");
    } catch {
      res.json({ error: "Не удалось удалить комментарий" });
    }
  }
};
