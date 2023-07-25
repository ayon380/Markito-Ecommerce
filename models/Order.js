import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EUser",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  ID: {
    type: Number,
    required: true,
    unique: true,
    default: function () {
      // Get the current timestamp (in milliseconds) and convert it to a string
      const timestamp = Date.now().toString();

      // Generate a random 6-digit number
      const randomPart = Math.floor(100000 + Math.random() * 900000);

      // Combine the timestamp and random part to create a 10-digit number
      return parseInt(timestamp + randomPart);
    },
  },
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
