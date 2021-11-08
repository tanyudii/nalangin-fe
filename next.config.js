/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/password",
        destination: "/password/email",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination:
          process.env.GRAPHQL_ENDPOINT || "http://localhost:3000/graphql",
      },
    ];
  },
  reactStrictMode: true,
  optimizeFonts: true,
};
