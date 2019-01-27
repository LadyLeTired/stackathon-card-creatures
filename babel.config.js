module.exports = function(api) {
  api.cache(true);
  const plugins = [
    require("@babel/plugin-syntax-dynamic-import"),
    require("@babel/plugin-transform-async-to-generator"),
    [require("@babel/plugin-proposal-decorators"), { legacy: true }],
    [require("@babel/plugin-proposal-class-properties"), { loose: false }]
  ];
  const presets = ["@babel/env", "@babel/react"];
  return {
    plugins,
    presets
  };
};
