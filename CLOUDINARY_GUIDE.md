# Cloudinary Integration Guide

This repo supports Cloudinary-based uploads for images, PDFs, and videos.

## 1) Install status

These packages are already added in `server/`:

- `cloudinary`
- `multer`
- `multer-storage-cloudinary`

## 2) Environment Variables

Set these in `server/.env` and your hosting provider:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
CLOUDINARY_FOLDER=niamt-racing
MAX_IMAGE_SIZE_BYTES=8388608
MAX_DOCUMENT_SIZE_BYTES=15728640
MAX_VIDEO_SIZE_BYTES=104857600
```

Use either:
- `CLOUDINARY_URL` (recommended, less mismatch risk), or
- the 3 separate keys (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

If you exposed real keys in any file, rotate them from the Cloudinary dashboard.

## 3) New Backend Endpoints

Base path: `/api/media`

1. Upload single image:
   - `POST /api/media/image`
   - form-data key: `image`

2. Upload multiple images:
   - `POST /api/media/images`
   - form-data key: `images` (up to 10 files)

3. Upload single PDF:
   - `POST /api/media/document`
   - form-data key: `document`

4. Upload multiple PDFs:
   - `POST /api/media/documents`
   - form-data key: `documents` (up to 5 files)

5. Upload single video:
   - `POST /api/media/video`
   - form-data key: `video`

6. Upload multiple videos:
   - `POST /api/media/videos`
   - form-data key: `videos` (up to 5 files)

7. Delete any media by publicId:
   - `DELETE /api/media/file`
   - body: `{ "publicId": "niamt-racing/abc123", "resourceType": "image" }`
   - PDFs are uploaded as Cloudinary `image` resources, so `resourceType: "image"` works for both images and PDFs.
   - Videos use `resourceType: "video"`.

Legacy delete endpoint still works for images:
- `DELETE /api/media/image`

## 4) Response format

Upload response includes:

```json
{
  "media": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "niamt-racing/...",
    "originalName": "file.jpg",
    "bytes": 12345,
    "format": "jpg"
  }
}
```

## 5) One-time migration for existing DB images

If DB image fields still use local `/assets/...` paths, run:

```bash
npm run migrate:images --prefix server
```

This script uploads and updates:

- `HomeContent.heroImage`
- `HomeContent.legacyImage`
- `HomeContent.testimonial.image`
- `Achievement.image`
- `SponsorLogo.image`

For promo video migration (`HomeContent.promoVideo`), run:

```bash
npm run migrate:videos --prefix server
```

## 6) Frontend examples (Vite)

Use `FormData` and do not manually set `Content-Type`:

```js
import { uploadSingleImage, uploadSingleDocument, uploadSingleVideo } from "./src/api/media";

await uploadSingleImage(imageFile);
await uploadSingleDocument(pdfFile);
await uploadSingleVideo(videoFile);
```

## 7) Important notes

1. Uploaded images are transformed with:
   - max width `1200`
   - `q_auto`
   - `f_auto`
2. Uploaded PDFs are also optimized by Cloudinary (`q_auto`) and delivered from Cloudinary CDN.
3. Frontend applies Cloudinary delivery transformations (`w_`, `q_auto`, `f_auto`) with responsive `srcSet`.
4. Allowed image formats: `jpg`, `jpeg`, `png`, `webp`.
5. Allowed document format: `pdf`.
6. Allowed video formats: `mp4`, `webm`, `mov`.
7. If Cloudinary env vars are missing, media endpoints return `500` with a clear config message.
