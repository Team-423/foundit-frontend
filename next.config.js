/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows all HTTPS domains (use with caution)
      },
      {
        protocol: "http",
        hostname: "**", // This allows all HTTP domains (use with caution)
      },
    ],
    // Alternative: specify exact domains for better security
    // domains: [
    //   "i0.wp.com",
    //   "cdn.pixabay.com",
    //   "picsum.photos",
    //   "www.idcardsandaccessories.co.uk",
    //   "m.media-amazon.com",
    // ],
  },
};
