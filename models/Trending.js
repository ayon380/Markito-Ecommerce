import mongoose from "mongoose";
import Product from "./Product";
const trendingProductsSchema = new mongoose.Schema({
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Replace "Product" with the name of the referenced collection
        required: true,
      },
      // Other fields related to the product within the trendingProductsSchema
    },
  ],
});

const Trending = mongoose.models.Trending || mongoose.model("Trending", trendingProductsSchema);

export default Trending;
