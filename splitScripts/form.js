function form() {
    let message = {
        loading: 'Please wait. Sending message ... ',
        success: 'Your message has been successfully delivered',
        fail: 'Messeage not delivered. Sorry, try again later'
    }

    let form = document.querySelector('.main-form'),
        inputForm = form.getElementsByTagName('input'),
        messageStatus = document.createElement('div');
        closeForm = document.querySelector('.popup-close')

    messageStatus.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(messageStatus);

        let formData = new FormData(form);

        // Make JSON object
        let obj = {};

        formData.forEach(function(value,key) {
            obj[key] = value;
        });

        let objJSON = JSON.stringify(obj);

        function postDataForm(data) {
            return new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            //json explanation
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')

            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');           

            request.onreadystatechange = function() {
                if (request.readyState < 4){
                    resolve();
                }
                else if (request.readyState === 4 && request.status == 200) {
                    resolve();            
                }
                else { 
                    reject()
                }
            }; // onreadystatechange  

            // request.send(data)

            //Json
            request.send(objJSON)

            }); //end promise
        }; //end postDataForm

        function closeModalWindow() {
            popupBtn.addEventListener('click', function() {            
                overlay.style.display = '';
                moreBtn.classList.remove('more-splash');
                document.body.style.overflow = 'visible';  
                messageStatus.innerHTML = '';
                clearInput();
            })
        };// end closeModalWindow
        
        function clearInput() {
            for (let i = 0; i < inputForm.length; i++) {
            inputForm[i].value = '';
            }
        } //end ClearInput
        
        postDataForm(formData)
        .then(()=> messageStatus.innerHTML = message.loading)
        .then(()=> messageStatus.innerHTML = message.success)
        .catch(()=> messageStatus.innerHTML = message.success)
        .then(()=> closeModalWindow())


    }); //addEventListener
};

module.export = form;

