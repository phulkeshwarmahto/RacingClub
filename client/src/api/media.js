import { http } from "./http";

export const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await http.post("/media/image", formData);
  return data;
};

export const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  const { data } = await http.post("/media/images", formData);
  return data;
};

export const uploadSingleDocument = async (file) => {
  const formData = new FormData();
  formData.append("document", file);
  const { data } = await http.post("/media/document", formData);
  return data;
};

export const uploadMultipleDocuments = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("documents", file));
  const { data } = await http.post("/media/documents", formData);
  return data;
};

export const uploadSingleVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);
  const { data } = await http.post("/media/video", formData);
  return data;
};

export const uploadMultipleVideos = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("videos", file));
  const { data } = await http.post("/media/videos", formData);
  return data;
};

export const deleteMediaByPublicId = async (publicId, resourceType = "image") => {
  const { data } = await http.delete("/media/file", { data: { publicId, resourceType } });
  return data;
};

export const deleteImageByPublicId = async (publicId) => {
  const data = await deleteMediaByPublicId(publicId, "image");
  return data;
};

export const deleteDocumentByPublicId = async (publicId) => {
  const data = await deleteMediaByPublicId(publicId, "image");
  return data;
};

export const deleteVideoByPublicId = async (publicId) => {
  const data = await deleteMediaByPublicId(publicId, "video");
  return data;
};
