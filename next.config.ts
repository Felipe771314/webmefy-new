const path = require('path');
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {},
  webpack: (config: Configuration): Configuration => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    Object.assign(config.resolve.alias, {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@config': path.resolve(__dirname, 'config'),
      '@themes': path.resolve(__dirname, 'themes'),
    });

    return config;
  },
};

export default nextConfig;
