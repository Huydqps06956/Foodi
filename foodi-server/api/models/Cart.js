const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  quantity: Number,
  price: Number,
  email: {
    type: String,
    true: true,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
