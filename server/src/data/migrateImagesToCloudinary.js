import dotenv from "dotenv";
import { isCloudinaryConfigured } from "../config/cloudinary.js";
import { connectDB } from "../config/db.js";
import { Achievement } from "../models/Achievement.js";
import { HomeContent } from "../models/HomeContent.js";
import { SponsorLogo } from "../models/SponsorLogo.js";
import { formatCloudinaryError, isLocalAssetPath, uploadLocalImage } from "./cloudinaryMigrationUtils.js";

dotenv.config();

const migrateHomeContentImages = async () => {
  const doc = await HomeContent.findOne();
  if (!doc) {
    return 0;
  }

  let updates = 0;

  if (isLocalAssetPath(doc.heroImage)) {
    const result = await uploadLocalImage(doc.heroImage);
    doc.heroImage = result.secure_url;
    doc.heroImagePublicId = result.public_id;
    updates += 1;
    console.log(`Migrated heroImage -> ${result.public_id}`);
  }

  if (isLocalAssetPath(doc.legacyImage)) {
    const result = await uploadLocalImage(doc.legacyImage);
    doc.legacyImage = result.secure_url;
    doc.legacyImagePublicId = result.public_id;
    updates += 1;
    console.log(`Migrated legacyImage -> ${result.public_id}`);
  }

  if (doc.testimonial && isLocalAssetPath(doc.testimonial.image)) {
    const result = await uploadLocalImage(doc.testimonial.image);
    doc.testimonial.image = result.secure_url;
    doc.testimonial.publicId = result.public_id;
    updates += 1;
    console.log(`Migrated testimonial image -> ${result.public_id}`);
  }

  if (updates > 0) {
    await doc.save();
  }

  return updates;
};

const migrateAchievementImages = async () => {
  const items = await Achievement.find({ image: { $regex: "^/assets/" } });
  let migrated = 0;

  for (const item of items) {
    const result = await uploadLocalImage(item.image);
    item.image = result.secure_url;
    item.imagePublicId = result.public_id;
    await item.save();
    migrated += 1;
    console.log(`Migrated achievement "${item.title}" -> ${result.public_id}`);
  }

  return migrated;
};

const migrateSponsorLogos = async () => {
  const logos = await SponsorLogo.find({ image: { $regex: "^/assets/" } });
  let migrated = 0;

  for (const logo of logos) {
    const result = await uploadLocalImage(logo.image);
    logo.image = result.secure_url;
    logo.imagePublicId = result.public_id;
    await logo.save();
    migrated += 1;
    console.log(`Migrated sponsor logo "${logo.name}" -> ${result.public_id}`);
  }

  return migrated;
};

const run = async () => {
  try {
    if (!isCloudinaryConfigured) {
      throw new Error(
        "Cloudinary env is missing/invalid. Set valid CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET."
      );
    }

    await connectDB();

    const homeCount = await migrateHomeContentImages();
    const achievementCount = await migrateAchievementImages();
    const logoCount = await migrateSponsorLogos();

    console.log(
      `Migration complete. Home images: ${homeCount}, achievements: ${achievementCount}, sponsor logos: ${logoCount}.`
    );
    process.exit(0);
  } catch (error) {
    console.error("Image migration failed:", formatCloudinaryError(error));
    if (error?.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

run();
