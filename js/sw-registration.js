if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js')
        .then((registration)=>{
            console.log('Registered:', registration);
        })
        .catch(function(error){
            console.log('Reigstration Failed: ', error);
        });
    }