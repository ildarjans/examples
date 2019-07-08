
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', function () {
    
    
    function setCurrency(curRate) {
        inputUsd.value = Math.floor((inputRub.value / curRate)*100) / 100
    }; //end setCurrency for request.onreadystatechange method

    function CalcCurrency(curRate) {
        return Math.floor((inputRub.value / curRate)*100) / 100
    };//end CalcCurrency for request.onload method

    function callPromise() {
        return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();

        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.send();
        console.log(this);

        request.onload = function () {
            if (request.readyState === 4 && request.status == 200) {
                // explanation with onreadystatechange method
                // let curValue = JSON.parse(request.response).usd;
                // resolve(curValue);
                // console.log(this);
                resolve(this.response);
            } 
            else {
                reject();
            }
        }; //end onreadystatechange
    }); //end Promise 
}; //end callPromise

callPromise()
//      .then(curValue => setCurrency(curValue))
        .then(response => {
            console.log(this.response)
            let curValue = JSON.parse(response);
            return curValue.usd;
        })
        .then(curValue => {
            inputUsd.value = CalcCurrency(curValue)
        })
        .catch(()=> inputUsd.value = "Current rate unavaliable")

}) //end addEventListener