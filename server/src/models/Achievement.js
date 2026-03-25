import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rank: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Achievement = mongoose.model("Achievement", achievementSchema);
