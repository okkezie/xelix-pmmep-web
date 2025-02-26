/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ui-avatars.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'unsplash.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
}

export default nextConfig;
