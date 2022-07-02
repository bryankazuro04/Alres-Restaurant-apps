import "regenerator-runtime/runtime";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import CONFIG from "./globals/config";
// import CacheHelper from "./utils/cache-helper";

setCacheNameDetails({
  prefix: CONFIG.CACHE_NAME,
  suffix: "app",
  precache: "precache",
  runtime: "runtime",
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({ cacheName: `${CONFIG.CACHE_NAME}-network` })
);

// registerRoute(
//   /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
//   new StaleWhileRevalidate({
//     cacheName: "dicoding-api-restaurant-cache",
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] }),
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 60 * 60 * 24 * 7
//       })
//     ],
//   })
// );

registerRoute(
  ({ request }) =>
  request.destination === "style" ||
  request.destination === "script" ||
  request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: `${CONFIG.CACHE_NAME}-assets`,
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: `${CONFIG.CACHE_NAME}-image`,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);

registerRoute(
  ({ url }) =>
  url.origin === "https://fonts.googleapis.com" ||
  url.origin === "https://restaurant-api.dicoding.dev" ||
  url.origin === "https://yummly2.p.rapidapi.com",
  new StaleWhileRevalidate({
    cacheName: "API-cache",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);

cleanupOutdatedCaches();

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// const { assets } = global.serviceWorkerOption;

// self.addEventListener("install", (event) => {
//   console.log("Installing Service Worker");
//   event.waitUntil(CacheHelper.cachingAppShell([...assets, "./"]));
// });

// self.addEventListener("activate", (event) => {
//   console.log("Activating Service Worker");
//   event.waitUntil(CacheHelper.deleteOldCache());
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(CacheHelper.revalidateCache(event.request));
// });
