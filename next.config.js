/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      return config
    }
    config.externals = config.externals || []
    const nodeBuiltins = [
      'net', 'tls', 'child_process', 'fs/promises', 'fs', 'dns',
      'timers/promises', 'readline', 'worker_threads', 'dgram',
      'cluster', 'http2', 'stream/promises', 'crypto', 'os',
      'path', 'url', 'util', 'zlib', 'events', 'buffer',
      'stream', 'string_decoder', 'sys', 'punycode', 'querystring',
      'module', 'require-from-string', 'vm', 'v8', 'assert',
      'console', 'constants', 'domain', 'errno', 'error-stack-traces',
      'graceful-fs', 'internal', 'process', 'perf_hooks', 'async_hooks',
      'diagnostics_channel', 'async_hooks', 'semver', 'source-map-support',
      'kerberos', '@mongodb-js/zstd', '@aws-sdk/credential-providers',
      'gcp-metadata', 'snappy', 'socks', 'aws4', 'mongodb-client-encryption'
    ]
    config.externals.push(...nodeBuiltins)
    return config
  },
}

module.exports = nextConfig