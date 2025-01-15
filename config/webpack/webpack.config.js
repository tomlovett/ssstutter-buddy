/* eslint no-undef: "off" -- Gets bad about `require` call */

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require('shakapacker')

const options = {
  resolve: {
    alias: {
      '@': path.resolve('./'),
      components: path.resolve('./javascript/components'),
    },
  },
}

module.exports = generateWebpackConfig(options)
