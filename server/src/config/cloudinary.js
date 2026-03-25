import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const normalizeEnv = (value) => (typeof value === "string" ? value.trim() : "");
const hasTemplatePlaceholder = (value) => /<[^>]+>/.test(value);

const cloudinaryUrl = normalizeEnv(process.env.CLOUDINARY_URL);
const cloudName = normalizeEnv(process.env.CLOUDINARY_CLOUD_NAME);
const apiKey = normalizeEnv(process.env.CLOUDINARY_API_KEY);
const apiSecret = normalizeEnv(process.env.CLOUDINARY_API_SECRET);

const hasCloudinaryUrl = Boolean(cloudinaryUrl) && !hasTemplatePlaceholder(cloudinaryUrl);
const hasCloudinaryEnv =
  Boolean(cloudName) &&
  Boolean(apiKey) &&
  Boolean(apiSecret) &&
  !hasTemplatePlaceholder(cloudName) &&
  !hasTemplatePlaceholder(apiKey) &&
  !hasTemplatePlaceholder(apiSecret);

if (hasCloudinaryUrl) {
  cloudinary.config(cloudinaryUrl);
} else if (hasCloudinaryEnv) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
}

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);
const documentMimeTypes = new Set(["application/pdf"]);
const videoMimeTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || "niamt-racing";
const maxImageSize = Number(process.env.MAX_IMAGE_SIZE_BYTES) || 8 * 1024 * 1024;
const maxDocumentSize = Number(process.env.MAX_DOCUMENT_SIZE_BYTES) || 15 * 1024 * 1024;
const maxVideoSize = Number(process.env.MAX_VIDEO_SIZE_BYTES) || 100 * 1024 * 1024;

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: cloudinaryFolder,
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }]
  })
});

const documentStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: cloudinaryFolder,
    resource_type: "image",
    allowed_formats: ["pdf"],
    transformation: [{ quality: "auto" }],
    use_filename: true,
    unique_filename: true
  })
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: cloudinaryFolder,
    resource_type: "video",
    allowed_formats: ["mp4", "webm", "mov"],
    transformation: [{ width: 1920, crop: "limit" }, { quality: "auto" }],
    use_filename: true,
    unique_filename: true
  })
});

const imageUploadBase = multer({
  storage: imageStorage,
  limits: { fileSize: maxImageSize },
  fileFilter: (_req, file, cb) => {
    if (imageMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Unsupported file type. Use jpg, jpeg, png, or webp."));
  }
});

const documentUploadBase = multer({
  storage: documentStorage,
  limits: { fileSize: maxDocumentSize },
  fileFilter: (_req, file, cb) => {
    if (documentMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Unsupported file type. Use pdf."));
  }
});

const videoUploadBase = multer({
  storage: videoStorage,
  limits: { fileSize: maxVideoSize },
  fileFilter: (_req, file, cb) => {
    if (videoMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Unsupported file type. Use mp4, webm, or mov."));
  }
});

export const requireCloudinaryConfig = (_req, res, next) => {
  if (!hasCloudinaryUrl && !hasCloudinaryEnv) {
    return res.status(500).json({
      message:
        "Cloudinary is not configured. Add valid CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET."
    });
  }

  return next();
};

export const cloudinaryUploadImageSingle = imageUploadBase.single("image");
export const cloudinaryUploadImageMultiple = imageUploadBase.array("images", 10);
export const cloudinaryUploadDocumentSingle = documentUploadBase.single("document");
export const cloudinaryUploadDocumentMultiple = documentUploadBase.array("documents", 5);
export const cloudinaryUploadVideoSingle = videoUploadBase.single("video");
export const cloudinaryUploadVideoMultiple = videoUploadBase.array("videos", 5);
export const isCloudinaryConfigured = hasCloudinaryEnv;
export { cloudinary };
