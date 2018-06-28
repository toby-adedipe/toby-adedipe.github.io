//self.addEventListener('fetch', (event)=>{
//
//})

const CACHE_NAME = 'static-cache';
const urlsToCache = [
    '.',
    'index.html',
    'main.css',
    'js/main.js'
];

self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener(fetch, ()=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return response || fetchAndCache(event.request);
        })
    )
})

function fetchAndCache(url){
    return fetch(url)
        .then((response)=>{
            //check for valid response
            if(!response.ok){
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then((cache)=>{
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch((error)=>{
            console.log('Request failed:', error);
        });
}