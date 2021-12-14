const cacheVersion = 'v1';

const cacheAssets = [
  '/',
  '/index.html',
  '/src/main.js',
  '/src/mediaPlayer.js',
  '/src/plugins/autoPlay.js',
  '/src/plugins/autoPause.js',
  '/css/style.css',
  '/assets/media/jolene.mp4',
]

self.addEventListener('install', event => {
  // event.waitUntil(precache());
  // console.log('service worker: Istalled')
  event.waitUntil(
    caches
    .open(cacheVersion)
    .then(cache => {
      // console.log('service worker: caching files')
      return cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
})

self.addEventListener('fetch', event => {
  const request = event.request;
  //get
  if(request.method !== 'GET') {
    return;
  }

  //buscar en cache
  event.respondWith(cacheResponse(request));

  //actualizar el cache.
  // event.waitUntil(updateCache(request));
})

// const precache = async () => {
//   const cache = await caches.open(cacheVersion)
//   return cache.addAll(cacheAssets);
// }

const cacheResponse = async (request) => {
  const cache = await caches.open(cacheVersion);
  const response = await cache.match(request); //preguntamos al cache si ya tiene una copia de lo que tiene en request, si es no, regresa un undefine
  return response || fetch(request);
}

// const updateCache = async (request) => {
//   const cache = await caches.open(cacheVersion);
//   //buscamos una copia actualizada.
//   const response = await fetch(request);
//   //cache.put aniadimos un nuevo caontenido al cache, con la llave (request, response)
//   return cache.put(request, response);
// }
