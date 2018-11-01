module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{css,js,png,html,woff2,woff,ttf,eot,svg}"
  ],
  "swDest": "./sw.js",
  "swSrc": "./sw_config.js",
  "maximumFileSizeToCacheInBytes": 10000000,
};