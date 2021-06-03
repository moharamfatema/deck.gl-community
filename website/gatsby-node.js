const resolve = require('path').resolve;
const getOcularConfig = require('ocular-dev-tools/config/ocular.config');

module.exports.onCreateWebpackConfig = function onCreateWebpackConfigOverride(opts) {
  const {
    stage, // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    // rules, // Object (map): set of preconfigured webpack config rules
    // plugins, // Object (map): A set of preconfigured webpack config plugins
    getConfig, // Function that returns the current webpack config
    // loaders, // Object (map): set of preconfigured webpack config loaders
    actions
  } = opts;

  console.log(`App rewriting gatsby webpack config ${stage}`); // eslint-disable-line

  const ALIASES = getOcularConfig({root: resolve(__dirname, '..')}).aliases;

  const config = getConfig();
  config.resolve = config.resolve || {};
  config.resolve.alias = Object.assign({
    react: resolve('node_modules/react'),
    'react-dom': resolve('node_modules/react-dom')
  }, config.resolve.alias, ALIASES);

  // Completely replace the webpack config for the current stage.
  // This can be dangerous and break Gatsby if certain configuration options are changed.
  // Generally only useful for cases where you need to handle config merging logic yourself,
  // in which case consider using webpack-merge.
  actions.replaceWebpackConfig(config);
};
