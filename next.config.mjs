// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flivv-web-cdn.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // add other remote hosts here if you need them
    ],
  },
};

export default nextConfig;


