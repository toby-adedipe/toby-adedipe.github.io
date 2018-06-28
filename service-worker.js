var cacheName = 'static-cache-v4';
var urlsToCache = [
    'index.html',
    'main.css'
];

self.addEventListener('install', function (event){
    event.waitUntil(
        caches.open(cacheName)
        .then(function (cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event)=>{
    console.log(event.request);
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
            return caches.open(cacheName)
                .then((cache)=>{
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch((error)=>{
            console.log('Request failed:', error);
        });
}
