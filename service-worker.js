// A unique name for our app's cache
const CACHE_NAME = 'mindful-pause-cache-v1';

// The files we want to cache for offline use
const urlsToCache = [
  '/',
  '/index.html', // Assuming you name your HTML file index.html
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Event listener for the 'install' event
// This is where we download and cache our app's files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener for the 'fetch' event
// This intercepts network requests and serves cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have a cached response, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch the resource from the network
        return fetch(event.request);
      })
  );
});