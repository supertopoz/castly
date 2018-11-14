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
    "url": "castly.67288452.js",
    "revision": "d03c33f7c7516b51442829fd34f108e1"
  },
  {
    "url": "Castly.eebf1402.js",
    "revision": "c1703a3166ea576884c6ba07081bb35d"
  },
  {
    "url": "castly.f4a8b73d.css",
    "revision": "0fea66c17ad473096b8176e7f20c9cef"
  },
  {
    "url": "Disclaimer.63022f42.js",
    "revision": "a07739038e6df577be907bf392b929e0"
  },
  {
    "url": "entry.parcel.375b4744.js",
    "revision": "03e5edc16ddcfac2060dccd1b7c1e5cb"
  },
  {
    "url": "Home.2d5b607d.js",
    "revision": "81e2086be62b0cc1224287b1e760f7e8"
  },
  {
    "url": "icon-128x128.890a2daa.png",
    "revision": "250c6d2e6ecc7dc74963ff7337cc19f5"
  },
  {
    "url": "icon-144x144.ecbfb06d.png",
    "revision": "6f19ab7cac6c0193ce31b0645138eba6"
  },
  {
    "url": "icon-152x152.5f47755a.png",
    "revision": "165a063d1456935711bddef24a02b7e2"
  },
  {
    "url": "icon-192x192.e86f853b.png",
    "revision": "78e2cbe6dfe8d162abae0f097d7c0393"
  },
  {
    "url": "icon-384x384.09d248ae.png",
    "revision": "aa15794da37292909b821e210c484220"
  },
  {
    "url": "icon-512x512.fe43b2c0.png",
    "revision": "cfdf90b9683e220b1af8c33c57bfc9fb"
  },
  {
    "url": "icon-72x72.5c20f2ef.png",
    "revision": "277e612051cf6aaba286e65f450bbe1b"
  },
  {
    "url": "icon-96x96.73287e0b.png",
    "revision": "27431013b3e4260d081d5a31f3aefcb5"
  },
  {
    "url": "index.html",
    "revision": "518b0cab64a22d522d5a29d0b5f00704"
  },
  {
    "url": "MaterialIcons-Regular.042e3246.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "MaterialIcons-Regular.7f257eac.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "MaterialIcons-Regular.b2dfdb43.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "MaterialIcons-Regular.cc4a9352.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "notification.76c0c572.eot",
    "revision": "c0d3c94cd6112550c51d7d1ed13b9da1"
  },
  {
    "url": "notification.a1894c55.ttf",
    "revision": "0b4ac1dc75df35e169b70d7719afe4cc"
  },
  {
    "url": "notification.b48c6de9.woff",
    "revision": "651771e1df95c807c99608188d0a4287"
  },
  {
    "url": "notification.b5315025.svg",
    "revision": "5bee74caefdf9d0a834915f6c8eeb259"
  },
  {
    "url": "pdf.worker.entry.9f721a0b.js",
    "revision": "9c5a0d669a4dd387bbb03659149418e3"
  }
]);
workbox.routing.registerNavigationRoute("/index.html");

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          console.log('deleted cache')
          return caches.delete(cacheName);
        })
      );
    })
  );
});

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}