module.exports = api => {
  const babelEnv = api.env();
  const plugins = [];
  //change to 'production' to check if this is working in 'development' mode
  if (babelEnv !== 'development') {
    plugins.push(['transform-remove-console', {exclude: ['error', 'warn']}]);
  }
  plugins.push([
    'babel-plugin-inline-import',
    {
      extensions: ['.svg'],
    },
  ]);
  plugins.push(['module:react-native-dotenv']);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
    overrides: [{
      "plugins": [
        ["@babel/plugin-transform-private-methods", {
        "loose": true
      }]
      ]
    }]
  };
};