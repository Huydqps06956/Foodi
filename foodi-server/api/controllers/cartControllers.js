const Cart = require("../models/Cart");

//get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ messsage: error.messsage });
  }
};

//get cart using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Cart.find(query).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ messsage: error.messsage });
  }
};

//post a cart item
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    //exiting menu item
    const existingCartItem = await Cart.findOne({ menuItemId });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exits in the cart" });
    }
    const cartItem = await Cart.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ messsage: error.messsage });
  }
};

//delete a cart item
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart items not found" });
    }
    res.status(200).json({ message: "Cart Item Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ messsage: error.messsage });
  }
};

// updata a cart item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, quantity, email },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Cart.findById(cartId);
    if (!cartItem) {
      return res.status(401).json({ message: "Cart Item not found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCartItems,
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
};
