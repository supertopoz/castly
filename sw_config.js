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
workbox.precaching.precacheAndRoute([]);
workbox.routing.registerNavigationRoute("/index.html");
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}