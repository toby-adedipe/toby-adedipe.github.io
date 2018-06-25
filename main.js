function loadCurrencies(){
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
        .then(response=> response.json())
        .then((currencies)=>{
            let options='';
            for(key in currencies.results){
                options=`${options}<option>${key}</option>`;
            }
            from.innerHTML=options;
            to.innerHTML=options;
        })
}