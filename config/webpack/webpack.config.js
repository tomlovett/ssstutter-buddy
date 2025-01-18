/* eslint no-undef: "off" -- Gets bad about `require` call */

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')
const path = require('path')

const options = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname + './'),
      '@components': path.resolve(__dirname + '/javascript/components'),
    },
  },
}

module.exports = generateWebpackConfig(options)
