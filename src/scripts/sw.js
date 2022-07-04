import "regenerator-runtime/runtime";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import CONFIG from "./globals/config";

setCacheNameDetails({
  prefix: CONFIG.CACHE_NAME,
  suffix: "app",
  precache: "precache",
  runtime: "runtime",
});

precacheAndRoute(self.__WB_MANIFEST);

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
