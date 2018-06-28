var cacheName = 'static-cache-v3';
var urlsToCache = [
    'index.html',
    'main.css'
];

self.addEventListener('install', function (event){
    event.waitUntil(
        caches.open(cacheName)
        .then(function (cache){
            return cache.addAll(urlsToCache);
            console.log('urls have been cached');
        })
    );
});

self.addEventListener(fetch, (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
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
