import fs from "node:fs/promises";
import path from "node:path";
import util from "node:util";
import { cloudinary } from "../config/cloudinary.js";

export const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || "niamt-racing";

export const isLocalAssetPath = (value) => typeof value === "string" && value.startsWith("/assets/");

export const toAbsoluteAssetPath = (assetPath) =>
  path.resolve(process.cwd(), "..", "client", "public", assetPath.replace(/^\//, ""));

export const formatCloudinaryError = (error) => {
  if (!error) {
    return "Unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  const cloudinaryMessage = error?.error?.message;
  const cloudinaryCode = error?.error?.http_code;
  const genericMessage = error?.message;

  if (cloudinaryMessage && cloudinaryCode) {
    return `${cloudinaryMessage} (HTTP ${cloudinaryCode})`;
  }

  if (cloudinaryMessage) {
    return cloudinaryMessage;
  }

  if (genericMessage) {
    return genericMessage;
  }

  return util.inspect(error, { depth: 4 });
};

const uploadLocalAsset = async (assetPath, options) => {
  const absolutePath = toAbsoluteAssetPath(assetPath);

  try {
    await fs.access(absolutePath);
  } catch (error) {
    throw new Error(`Asset not found at ${absolutePath} for path ${assetPath}`, { cause: error });
  }

  try {
    return await cloudinary.uploader.upload(absolutePath, {
      folder: cloudinaryFolder,
      ...options
    });
  } catch (error) {
    throw new Error(
      `Cloudinary upload failed for ${assetPath} (${absolutePath}): ${formatCloudinaryError(error)}`,
      { cause: error }
    );
  }
};

export const uploadLocalImage = async (assetPath) =>
  uploadLocalAsset(assetPath, {
    resource_type: "image",
    transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }]
  });

export const uploadLocalVideo = async (assetPath) =>
  uploadLocalAsset(assetPath, {
    resource_type: "video",
    transformation: [{ width: 1920, crop: "limit" }, { quality: "auto" }]
  });
