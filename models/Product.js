const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EUser",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EUser",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Nested array of replies (sub-documents)
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EUser",
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  stars: {
    type: Number,
    default: 4,
  },
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [commentSchema],
  reviews: [reviewSchema],

  images: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.pre("save", function (next) {
  if (this.reviews && this.reviews.length > 0) {
    // Calculate the sum of all review stars
    const totalStars = this.reviews.reduce(
      (sum, review) => sum + review.stars,
      0
    );
    this.stars = totalStars / this.reviews.length;
  }
  next();
});
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
