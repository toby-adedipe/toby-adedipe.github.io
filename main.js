function loadCurrencies(){
    return fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response => response.json())
    .then((currencies)=>{
        //return currencies.results
        for(let key in currencies.results){
            console.log(key)
        }
    })
}

