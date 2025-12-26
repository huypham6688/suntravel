import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ["localhost", "lh3.googleusercontent.com", "res.cloudinary.com"],
  },
};

export default withPayload(nextConfig);
