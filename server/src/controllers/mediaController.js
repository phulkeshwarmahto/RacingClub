import { cloudinary } from "../config/cloudinary.js";

const toMediaPayload = (file) => ({
  url: file.path,
  publicId: file.filename,
  originalName: file.originalname,
  bytes: file.size,
  format: file.format,
  resourceType: file.path?.includes("/video/upload/")
    ? "video"
    : file.path?.includes("/raw/upload/")
      ? "raw"
      : "image"
});

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded." });
  }

  return res.status(201).json({ media: toMediaPayload(req.file) });
};

export const uploadImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No image files uploaded." });
  }

  return res.status(201).json({ media: req.files.map(toMediaPayload) });
};

export const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No PDF file uploaded." });
  }

  return res.status(201).json({ media: toMediaPayload(req.file) });
};

export const uploadDocuments = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No PDF files uploaded." });
  }

  return res.status(201).json({ media: req.files.map(toMediaPayload) });
};

export const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No video file uploaded." });
  }

  return res.status(201).json({ media: toMediaPayload(req.file) });
};

export const uploadVideos = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No video files uploaded." });
  }

  return res.status(201).json({ media: req.files.map(toMediaPayload) });
};

export const deleteMedia = async (req, res, next) => {
  try {
    const publicId = req.body?.publicId || req.query?.publicId;
    const resourceType = req.body?.resourceType || req.query?.resourceType || "image";

    if (!publicId) {
      return res.status(400).json({ message: "publicId is required." });
    }

    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: resourceType });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(400).json({ message: "Unable to delete media from Cloudinary.", result });
    }

    return res.json({ success: true, result: result.result });
  } catch (error) {
    return next(error);
  }
};
