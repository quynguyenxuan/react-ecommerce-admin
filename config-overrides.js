const { useBabelRc, addWebpackPlugin, override } = require("customize-cra");
const Dotenv = require('dotenv-webpack');

console.log('appMode', process.env.APP_MODE)
module.exports = override(
  useBabelRc(), 
  addWebpackPlugin(
    new Dotenv({
      path: `./.env.${process.env.APP_MODE}`,
    })
  ),
);