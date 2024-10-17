const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/cartControllers");

//get all menu items
//router.get("/", cartControllers.getAllCartItems);

router.get("/", cartControllers.getCartByEmail);
router.post("/", cartControllers.addToCart);
router.delete("/:id", cartControllers.deleteCart);
router.put("/:id", cartControllers.updateCart);
router.get("/:id", cartControllers.getSingleCart);

module.exports = router;
