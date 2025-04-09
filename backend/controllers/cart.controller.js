import User from "../models/user.model.js";

// PATH     : /api/cart/add
// METHOD   : POST
// ACCESS   : Public
// DESC     : Add to Cart
export const addToCart = async (req, res) => {
  try {
    // Extract user ID from the authentication middleware
    const userId = req.user._id;
    const { itemId, color, quantity = 1 } = req.body;

    // Find the user
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    // Initialize the item in the cart if it doesn't exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Increment the color count if exists, otherwise set to 1
    cartData[itemId][color] = (cartData[itemId][color] || 0) + quantity;

    // Update user cart in the database
    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error in addToCart controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/cart/upate
// METHOD   : PUT
// ACCESS   : Public
// DESC     : Update Cart
export const updateCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const { itemId, color, quantity } = req.body;

    // Validate input
    if (!itemId || !color || quantity === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch user data
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    let cartData = userData.cartData || {};

    // If item doesn't exist in the cart, return an error
    if (!cartData[itemId] || !cartData[itemId][color]) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // If quantity is zero, remove the item from the cart
    if (quantity === 0) {
      delete cartData[itemId][color];

      // If there are no more colors for this item, remove the item itself
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // Update the quantity
      cartData[itemId][color] = quantity;
    }

    // Update the cart in the database (only update the cartData field)
    await User.findByIdAndUpdate(userId, { $set: { cartData } });

    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error in updateCart controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/cart/upate
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get User Cart
export const getUserCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getUserCart controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/cart/delete
// METHOD   : DELETE
// ACCESS   : PUBlIC
// DESC     : Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, color } = req.body;

    if (!itemId || !color) {
      return res.status(400).json({ error: "Missing itemId or color" });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][color]) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Remove the specified color of the item
    delete cartData[itemId][color];

    // If no colors left for this item, remove the item entirely
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    // Update the cart in DB
    await User.findByIdAndUpdate(userId, { $set: { cartData } });

    res.json({ success: true, message: "Item deleted successfully", cartData });
  } catch (error) {
    console.error("Error in deleteCartItem controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
