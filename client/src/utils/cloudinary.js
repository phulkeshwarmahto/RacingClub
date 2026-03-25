const CLOUDINARY_HOST_PATTERN = /res\.cloudinary\.com/i;

const isCloudinaryUrl = (url) => typeof url === "string" && CLOUDINARY_HOST_PATTERN.test(url);

const buildTransformSegment = ({ width, quality = "auto", format = "auto" } = {}) => {
  const transforms = ["c_limit"];

  if (width) {
    transforms.push(`w_${Math.max(1, Math.floor(width))}`);
  }

  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);
  return transforms.join(",");
};

export const getCloudinaryImageUrl = (url, options = {}) => {
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  if (url.includes("/image/upload/")) {
    const segment = buildTransformSegment(options);
    return url.replace("/image/upload/", `/image/upload/${segment}/`);
  }

  return url;
};

export const buildCloudinarySrcSet = (url, widths = [320, 640, 960, 1200]) => {
  if (!isCloudinaryUrl(url)) {
    return undefined;
  }

  return widths.map((width) => `${getCloudinaryImageUrl(url, { width })} ${width}w`).join(", ");
};
