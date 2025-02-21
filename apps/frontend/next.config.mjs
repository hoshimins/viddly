/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: '3002',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig;
