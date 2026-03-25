import mongoose from "mongoose";

const sponsorPointSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["why_sponsor", "reach"],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

export const SponsorPoint = mongoose.model("SponsorPoint", sponsorPointSchema);
