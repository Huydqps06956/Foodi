const mongoose = require("mongoose");
const { Schema } = mongoose;

const MenuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  category: String,
  price: Number,
});

//create model

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
