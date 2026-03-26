import { Helmet } from "react-helmet-async";

const SITE_NAME = "NIAMT Racing";
const SITE_URL = "https://niamtracing.com,https://niamtracing.vercel.app,https://niamtracing.in";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logoniamtrACING%20(1).png`;

const toCanonical = (path = "/") => new URL(path, SITE_URL).toString();

export default function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }) {
  const canonical = toCanonical(path);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
