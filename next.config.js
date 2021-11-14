const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    async rewrites() {
        return [
            {
                source: '/api/graphql',
                destination:
                    process.env.GRAPHQL_ENDPOINT ||
                    'http://localhost:3000/graphql',
            },
        ];
    },
    reactStrictMode: true,
    optimizeFonts: true,
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
});
