import mongoose from "mongoose";

const sponsorLogoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

export const SponsorLogo = mongoose.model("SponsorLogo", sponsorLogoSchema);
