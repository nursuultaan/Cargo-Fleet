const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  style: {
    postcss: {
      plugins: [require('@tailwindcss/postcss7-compat'), require('autoprefixer')]
    }
  },
  webpack: {
    configure: webpackConfig => {
      // Call dotenv and it will return an Object with a parsed key
      const env = dotenv.config().parsed;

      // Create a new DefinePlugin with keys from .env
      const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {});

      // Add the keys to webpack config
      webpackConfig.plugins.push(new DefinePlugin(envKeys));

      return webpackConfig;
    }
  }
};
