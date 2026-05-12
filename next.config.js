/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push(({ request }, callback) => {
        if (/^mongodb($|\/)/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        if (/^mongodb-client-encryption($|\/)/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        if (/^kerberos($|\/)/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        if (/^@mongodb-js\//.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        if (/^@aws-sdk\//.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        if (request === 'gcp-metadata' || request === 'snappy' || request === 'socks' || request === 'aws4') {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      })
    }
    return config
  },
}

module.exports = nextConfig