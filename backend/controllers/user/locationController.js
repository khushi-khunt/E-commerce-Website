import locationModel from "../../models/locationModel.js";

export const saveLocation = async (req, res) => {
  try {
    const { userId, address, zipCode, confirmLocation } = req.body;
    // Basic validation
    if (!userId || !address || !zipCode || !confirmLocation) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Save location in DB
    const location = await locationModel.create({
      userId,
      address,
      zipCode,
      confirmLocation,
    });
    console.log(location);
    res.json({ message: "Location saved successfully", location });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await locationModel
      .find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json({ locations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
