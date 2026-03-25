import { Router } from "express";
import {
  cloudinaryUploadDocumentMultiple,
  cloudinaryUploadDocumentSingle,
  cloudinaryUploadImageMultiple,
  cloudinaryUploadImageSingle,
  cloudinaryUploadVideoMultiple,
  cloudinaryUploadVideoSingle,
  requireCloudinaryConfig
} from "../config/cloudinary.js";
import {
  deleteMedia,
  uploadDocument,
  uploadDocuments,
  uploadImage,
  uploadImages,
  uploadVideo,
  uploadVideos
} from "../controllers/mediaController.js";

const router = Router();

router.post("/image", requireCloudinaryConfig, cloudinaryUploadImageSingle, uploadImage);
router.post("/images", requireCloudinaryConfig, cloudinaryUploadImageMultiple, uploadImages);
router.post("/document", requireCloudinaryConfig, cloudinaryUploadDocumentSingle, uploadDocument);
router.post("/documents", requireCloudinaryConfig, cloudinaryUploadDocumentMultiple, uploadDocuments);
router.post("/video", requireCloudinaryConfig, cloudinaryUploadVideoSingle, uploadVideo);
router.post("/videos", requireCloudinaryConfig, cloudinaryUploadVideoMultiple, uploadVideos);
router.delete("/file", requireCloudinaryConfig, deleteMedia);
router.delete("/image", requireCloudinaryConfig, deleteMedia);

export default router;
