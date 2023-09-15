import Cart from "../models/cartModel.js"; // Import the Cart model
import Product from "../models/productModel.js";

// Create a function to add a product to the user's cart
export const createCart = async (req, res) => {
  try {
    // Get the user ID from the request (you'll need to set this in your authentication middleware)
    const userId = req.params.userId; // Assuming you have user information stored in the request

    // Get the product ID from the request body
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new cart item
    const cartItems = new Cart({
      quantity,
      productId,
      userId,
    });

    // Save the cart item to the database
    await cartItems.save();

    // Return the newly created cart item
    return res.status(201).json(cartItems);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchCartProducts = async (req, res) => {
  try {
    // Use await to wait for the query to complete
    const cartItems = await Cart.find({ userId: req.params.userId });
    if (!cartItems) {
      // Handle the case where the cart is not found (404 Not Found)
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCartProducts = async (req, res) => {
  try {
    // Use await to wait for the deletion to complete
    const deleteProducts = await Cart.findByIdAndDelete(req.params.id);

    if (!deleteProducts) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
