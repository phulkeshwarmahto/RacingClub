import dotenv from "dotenv";
import { isCloudinaryConfigured } from "../config/cloudinary.js";
import { connectDB } from "../config/db.js";
import { HomeContent } from "../models/HomeContent.js";
import { formatCloudinaryError, isLocalAssetPath, uploadLocalVideo } from "./cloudinaryMigrationUtils.js";

dotenv.config();

const migrateHomePromoVideo = async () => {
  const doc = await HomeContent.findOne();
  if (!doc) {
    return 0;
  }

  if (!isLocalAssetPath(doc.promoVideo)) {
    return 0;
  }

  const result = await uploadLocalVideo(doc.promoVideo);
  doc.promoVideo = result.secure_url;
  doc.promoVideoPublicId = result.public_id;
  await doc.save();

  console.log(`Migrated promoVideo -> ${result.public_id}`);
  return 1;
};

const run = async () => {
  try {
    if (!isCloudinaryConfigured) {
      throw new Error(
        "Cloudinary env is missing/invalid. Set valid CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET."
      );
    }

    await connectDB();
    const videoCount = await migrateHomePromoVideo();
    console.log(`Video migration complete. Home videos: ${videoCount}.`);
    process.exit(0);
  } catch (error) {
    console.error("Video migration failed:", formatCloudinaryError(error));
    if (error?.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

run();
