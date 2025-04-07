import { Cart } from "../models/cart.model.js";
import Product from "../models/product.model.js";

// PATH     : /api/user/cart
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : add to cart
export const addToCart = async (req, res) => {
  const { productId, price, salePrice } = req.body;

  // Check if the required fields are provided
  if (!productId || !price) {
    return res.status(400).json({
      error: "Product ID and price are required.",
    });
  }

  try {
    // Find the product in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    // Get the user's cart (assuming you have authentication middleware)
    const userCart = await Cart.findOne({ user: req.user.id });

    if (!userCart) {
      return res.status(404).json({
        error: "User cart not found.",
      });
    }

    // Add the product to the cart
    const existingItem = userCart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
      userCart.items.push({
        product: productId,
        price,
        salePrice: salePrice || price, // Default to price if salePrice is not available
        quantity: 1,
      });
    }

    await userCart.save();
    res.status(200).json({ message: "Product added to cart successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error while adding product to cart.",
    });
  }
};
