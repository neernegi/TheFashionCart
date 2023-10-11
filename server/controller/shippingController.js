import Shipping from "../models/shippingAddressModel.js";

export const createShippingInfo = async (req, res) => {
  const { address, city, state, country, pincode, phoneNo } = req.body;
  const { userId } = req.params; // Extract user ID from request parameters

  // Input validation
  if (!address || !city || !state || !country || !pincode || !phoneNo) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    // Check if the user with the provided ID exists in your database
    // You may need to import the User model and use the appropriate query

    // Create a new shipping address with the shipping information and user ID
    const shippingAddress = new Shipping({
      address,
      city,
      state,
      country,
      pinCode: pincode, // Make sure the field name matches the schema
      phoneNo,
      user: userId, // Assign the user ID from request parameters
      // You can add other fields as needed
    });

    // Save the shipping address to the database
    await shippingAddress.save();

    res.status(201).json({
      success: true,
      shippingAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating shipping address" });
  }
};
