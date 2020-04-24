const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withSize = require('next-size');

module.exports = withSize(withImages(withCSS({
  /* config options here */
  
}))
);