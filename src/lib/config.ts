export const config = {
  baseUrl: process.env.URL ?? "http://localhost:3000",
  cloudinary: {
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  },
};

export const COOKIE_NAME = "rms-session";
