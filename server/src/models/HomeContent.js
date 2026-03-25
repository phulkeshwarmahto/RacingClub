import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    accent: { type: String, required: true }
  },
  { _id: false }
);

const reachMetricSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true }
  },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    publicId: { type: String }
  },
  { _id: false }
);

const homeContentSchema = new mongoose.Schema(
  {
    heroImage: { type: String, required: true },
    heroImagePublicId: { type: String },
    promoVideo: { type: String, required: true },
    promoVideoPublicId: { type: String },
    clubName: { type: String, required: true },
    subtitle: { type: String, required: true },
    institution: { type: String, required: true },
    aboutPrimary: { type: String, required: true },
    aboutSecondary: { type: String, required: true },
    announcementTitle: { type: String, required: true },
    announcementMessage: { type: String, required: true },
    announcementTicker: { type: String, required: true },
    legacyText: { type: String, required: true },
    legacyImage: { type: String, required: true },
    legacyImagePublicId: { type: String },
    domains: { type: [domainSchema], default: [] },
    reachMetrics: { type: [reachMetricSchema], default: [] },
    testimonial: { type: testimonialSchema, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactLocation: { type: String, required: true },
    socialLinks: { type: [socialLinkSchema], default: [] }
  },
  { timestamps: true }
);

export const HomeContent = mongoose.model("HomeContent", homeContentSchema);
