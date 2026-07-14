/* PTE SUMMIT — Service Worker
   方針: network-first
   - オンライン: 常にネットから最新を取得し、キャッシュを更新(古い版が残らない)
   - オフライン(機内): キャッシュから起動。Vocab SprintとWFDは通信不要で動作 */

const CACHE = "pte-summit-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./content.json",
  "./manifest.webmanifest"
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
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;

  // アプリ自身のファイルのみ扱う(Anthropic APIなどは素通し)
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        // 取得成功 → キャッシュを最新に差し替え
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(async () => {
        // オフライン → キャッシュで応答
        const hit = await caches.match(req);
        if (hit) return hit;
        // ナビゲーション要求はindex.htmlにフォールバック
        if (req.mode === "navigate") {
          const idx = await caches.match("./index.html");
          if (idx) return idx;
        }
        return new Response("オフラインです", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      })
  );
});
