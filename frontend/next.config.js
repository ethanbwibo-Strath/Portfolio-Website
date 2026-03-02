/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'huggingface.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
    ],
  },
};

module.exports = nextConfig;
