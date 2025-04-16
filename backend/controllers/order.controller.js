import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// PATH     : /api/order/place
// METHOD   : POST
// ACCESS   : Public
// DESC     : Placing order using COD Method
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cart, totalAmount, deliveryInfo } = req.body;

    // Validate if cart is valid
    if (!cart || Object.keys(cart).length === 0) {
      return res
        .status(400)
        .json({ error: "Cart is empty or items are invalid." });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    if (
      !deliveryInfo.firstName ||
      !deliveryInfo.lastName ||
      !deliveryInfo.email ||
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.phone
    ) {
      return res.status(400).json({ error: "Incomplete address information." });
    }

    // Transform cart object to items array
    const items = [];

    for (const productId in cart) {
      const colorQuantities = cart[productId];

      for (const color in colorQuantities) {
        const quantity = colorQuantities[color];

        items.push({
          productId,
          quantity,
          color,
        });
      }
    }

    // Fetch product details
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found with ID: ${item.productId}`);
        }

        return {
          productId: item.productId,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          color: item.color,
          productImages: product.productImages,
        };
      })
    );

    // Save order
    const orderData = {
      userId,
      items: orderItems,
      amount: totalAmount,
      address: {
        firstName: deliveryInfo.firstName,
        lastName: deliveryInfo.lastName,
        email: deliveryInfo.email,
        address: deliveryInfo.address,
        city: deliveryInfo.city,
        phone: deliveryInfo.phone,
      },
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", id: newOrder._id });
  } catch (error) {
    console.log("Error in placeOrder Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/order/get
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : get user orders
export const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all orders associated with the user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this user" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in userOrders Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/order/all
// METHOD   : GET
// ACCESS   : Private
// DESC     : get All orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in allOrders Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/order/update
// METHOD   : POST
// ACCESS   : Public
// DESC     : update user order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Set timestamps if the status is Cancelled or Delivered
    if (status === "Cancelled" && !order.cancelledAt) {
      order.cancelledAt = new Date();
    }

    if (status === "Delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
