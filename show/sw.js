/* Show Don't Tell — Owl Studio service worker
   Strategy: network-first, same as PTE SUMMIT.
   - Online : always fetch fresh, then refresh the cache (no stale releases)
   - Offline: serve from cache. The whole game works with no connection;
              only the optional tutor review needs the network.
   Scope is /show/ so this never touches the PTE SUMMIT app at the site root. */

const CACHE = "show-owl-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./content.json",
  "./manifest.webmanifest",
  "./owl.webp",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      // Only ever drop our own older versions. PTE SUMMIT lives on the same
      // origin with its own cache, and caches are shared per-origin — filtering
      // by prefix stops the two apps from deleting each other's offline data.
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith("show-owl-") && k !== CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Only this app's own files. The Anthropic API and the sibling app pass through.
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(new URL("./", self.location).pathname)) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(req);
        if (hit) return hit;
        if (req.mode === "navigate") {
          const idx = await caches.match("./index.html");
          if (idx) return idx;
        }
        return new Response("Offline", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      })
  );
});
