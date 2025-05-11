import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// PATH     : /api/cart/add
// METHOD   : POST
// ACCESS   : Public
// DESC     : Add to Cart
export const addToCart = async (req, res) => {
  try {
    // Extract user ID from the authentication middleware
    const userId = req.user._id;
    const { itemId, color, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: "itemId is required" });
    }

    // Find the user
    const userData = await User.findById(userId);
    if (!userData) return res.status(404).json({ error: "User not found" });

    const product = await Product.findById(itemId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cartData = userData.cartData || {};

    // Initialize the item in the cart if it doesn't exist
    if (product.colors && product.colors.length > 0) {
      // ✅ Product has color options
      if (!color) {
        return res
          .status(400)
          .json({ error: "Color is required for this product" });
      }

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][color] = (cartData[itemId][color] || 0) + quantity;
    } else {
      // ✅ Product does not have color options
      cartData[itemId] = (cartData[itemId] || 0) + quantity;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/cart/update
// METHOD   : PUT
// ACCESS   : Private
// DESC     : Update Cart
export const updateCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const { itemId, color, quantity } = req.body;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({ error: "Missing itemId or quantity" });
    }

    const product = await Product.findById(itemId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let updateQuery = {};

    if (product.colors && product.colors.length > 0) {
      // ✅ Product has colors
      if (!color) {
        return res
          .status(400)
          .json({ error: "Color is required for this product" });
      }

      if (quantity === 0) {
        updateQuery = {
          $unset: {
            [`cartData.${itemId}.${color}`]: 1,
          },
        };
      } else {
        updateQuery = {
          $set: {
            [`cartData.${itemId}.${color}`]: quantity,
          },
        };
      }
    } else {
      // ✅ Product has no colors
      if (quantity === 0) {
        updateQuery = {
          $unset: {
            [`cartData.${itemId}`]: 1,
          },
        };
      } else {
        updateQuery = {
          $set: {
            [`cartData.${itemId}`]: quantity,
          },
        };
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, data: updatedUser.cartData });
  } catch (error) {
    console.error("Error in updateCart:", error.message);
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
// ACCESS   : Private
// DESC     : Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, color } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: "Missing itemId" });
    }

    const product = await Product.findById(itemId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (product.colors && product.colors.length > 0) {
      // ✅ Product has colors
      if (!color) {
        return res
          .status(400)
          .json({ error: "Color is required for this product" });
      }

      if (!cartData[itemId] || !cartData[itemId][color]) {
        return res.status(404).json({ error: "Item/color not found in cart" });
      }

      delete cartData[itemId][color];

      // If no colors left for the item, delete the item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // ✅ Product has no colors
      if (!cartData[itemId]) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      delete cartData[itemId];
    }

    await User.findByIdAndUpdate(userId, { $set: { cartData } });

    res.json({ success: true, message: "Item deleted successfully", cartData });
  } catch (error) {
    console.error("Error in deleteCartItem:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
