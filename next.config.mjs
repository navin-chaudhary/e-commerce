/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.fakestore.com',
        port: '',
        pathname: '*',
      },
    ],
    domains: ['images.pexels.com', 'fakestoreapi.com'], // Added 'fakestoreapi.com' here
  },
};

export default nextConfig;
