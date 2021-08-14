const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ]
}, { timestamps: true });

module.exports = model("Product", productSchema);
