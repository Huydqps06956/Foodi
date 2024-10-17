const Menu = require("../models/Menu");

const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ messsage: error.messsage });
  }
};

module.exports = { getAllMenuItems };
