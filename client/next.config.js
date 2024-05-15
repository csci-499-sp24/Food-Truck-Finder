/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [ {
      protocol: 'https',
      hostname: '499capstone-images.s3.us-east-1.amazonaws.com',
      port: '',
      pathname: '/**'
    }]
  }
};

module.exports = nextConfig;
