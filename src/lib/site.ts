export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "Caroline Rocha";
export const mediaKitPath = "/midiakit";
export const mediaKitUrl = `${siteUrl}${mediaKitPath}`;

export const siteImage = {
  share: "/media/smile-v3.webp",
};
