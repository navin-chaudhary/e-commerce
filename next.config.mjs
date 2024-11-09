/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.fakestore.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      }
    ],
    domains: [
      'images.pexels.com', 
      'fakestoreapi.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
  },
};

export default nextConfig;