// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist',
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    '@snowpack/plugin-postcss',
  ],
  packageOptions: {
    polyfillNode: true,
    // types: true,
    // source: 'remote',
  },
  devOptions: {
    port: 3000,
    open: 'none',
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    // types: './types',
    // components: './src/components',
  },
  exclude: [
    '**/node_modules/**/*',
    '**/stories/**/*',
    '**/*.stories.js',
    '**/setupTests.(js|ts)',
  ],
}
