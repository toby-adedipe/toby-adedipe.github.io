

const dbPromise = idb.open('test-db', 1, upgradeDb=>{
    let keyValStore = upgradeDb.createObjectStore('keyval');
    keyValStore.put('world', 'hello');
});
