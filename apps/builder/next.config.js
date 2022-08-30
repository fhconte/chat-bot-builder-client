// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs')
const { i18n } = require('./next-i18next.config')

const moduleExports = {
  experimental: {
    outputStandalone: true,
  },
  i18n,
  optimizeFonts: false,
  //basePath: '/embed/builder',
  assetPrefix: '/embed/builder',
  rewrites() {
    return [
      { source: '/embed/builder/_next/:path*', destination: '/_next/:path*' },
      { source: '/embed/builder/typebots/:path*', destination: '/typebots/:path*' },
      { source: '/api/:path*', destination: '/embed/builder/api/:path*' },
    ]
  }
}

const sentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports
