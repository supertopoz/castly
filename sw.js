/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([
  {
    "url": "castly.e31bb0bc.css",
    "revision": "0a67942b18840484c088d7be9c9140ed"
  },
  {
    "url": "castly.e31bb0bc.js",
    "revision": "aecef70a8b502f1038e13155fb1d3468"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "250c6d2e6ecc7dc74963ff7337cc19f5"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "6f19ab7cac6c0193ce31b0645138eba6"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "165a063d1456935711bddef24a02b7e2"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "78e2cbe6dfe8d162abae0f097d7c0393"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "aa15794da37292909b821e210c484220"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "cfdf90b9683e220b1af8c33c57bfc9fb"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "277e612051cf6aaba286e65f450bbe1b"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "27431013b3e4260d081d5a31f3aefcb5"
  },
  {
    "url": "index.html",
    "revision": "216989f80b42154cdf0334f9ae228f1b"
  },
  {
    "url": "index.js",
    "revision": "5315870673e610b62c4531c58334f20e"
  },
  {
    "url": "MaterialIcons-Regular.11799939.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "MaterialIcons-Regular.6924d4ac.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "MaterialIcons-Regular.a71f6b9a.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "MaterialIcons-Regular.bcffbc15.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "notification.53191d93.ttf",
    "revision": "0b4ac1dc75df35e169b70d7719afe4cc"
  },
  {
    "url": "notification.80e500ee.eot",
    "revision": "c0d3c94cd6112550c51d7d1ed13b9da1"
  },
  {
    "url": "notification.9dad18e7.woff",
    "revision": "651771e1df95c807c99608188d0a4287"
  },
  {
    "url": "notification.a4d4c64c.svg",
    "revision": "5bee74caefdf9d0a834915f6c8eeb259"
  },
  {
    "url": "pdf.worker.entry.7ce4fb6a.js",
    "revision": "83482e4d11a89fe3b2f950281ce2b50e"
  },
  {
    "url": "workbox-config.js",
    "revision": "fc4205d4d9223d61322e33367b3efa06"
  }
]);
workbox.routing.registerNavigationRoute("/index.html");
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}