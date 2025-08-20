import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    confirmLocation: { type: String, required: true }, // landmark or extra details
  },
  { timestamps: true }
);

export default mongoose.model("Location", LocationSchema);
