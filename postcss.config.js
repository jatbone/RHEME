const postcssNormalize = require('postcss-normalize')
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
// const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    postcssPresetEnv(),
    postcssImport(),
    postcssNormalize(),
    isProd && autoprefixer(),
    isProd && cssnano(),
  ].filter(Boolean),
}
