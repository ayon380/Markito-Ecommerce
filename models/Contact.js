const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", UserSchema);
export default Contact;
