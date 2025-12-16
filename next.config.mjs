// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'flivv-web-cdn.s3.ap-south-1.amazonaws.com',
//         port: '',
//         pathname: '/**',
//       },
//       // add other remote hosts here if you need them
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // REQUIRED for S3 + CloudFront

  trailingSlash: true, // REQUIRED for S3 routing

  images: {
    unoptimized: true, // REQUIRED (no Next.js image server)

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flivv-web-cdn.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      // If you have other image CDNs, add them here
    ],
  },
};

export default nextConfig;
