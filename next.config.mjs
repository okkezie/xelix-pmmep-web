/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     turbo: {
    //         rules: {
    //             '*.svg': {
    //                 loaders: ['@svgr/webpack', 'url-loader'],
    //                 as: '*.js'
    //             }
    //         }
    //     }
    // },
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    //         //   use: ['@svgr/webpack', 'url-loader'],
    //         use: [
    //             {
    //                 loader: 'url-loader',
    //                 options: {
    //                     limit: 10240,
    //                     name: 'name].[ext]',
    //                     esModule: false,
    //                 },
    //             },
    //             {
    //                 loader: '@svgr/webpack',
    //                 options: {
    //                     prettier: false,
    //                     svgoConfig: {
    //                         plugins: [
    //                             {
    //                                 name: 'preset-default',
    //                                 params: {
    //                                     overrides: {
    //                                         removeViewBox: false,
    //                                     },
    //                                 },
    //                             },
    //                             'prefixIds',
    //                         ],
    //                     },
    //                 },
    //             },
    //         ]
    //     });

    //     return config;
    // },
}

export default nextConfig;
