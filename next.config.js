/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  webpack: (config) => {
    config.externals = config.externals || []
    config.externals.push('net', 'tls', 'child_process', 'fs/promises')
    return config
  },
}

module.exports = nextConfig