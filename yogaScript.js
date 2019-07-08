window.addEventListener('DOMContentLoaded', function() {
    let header = document.querySelector('.info-header'),
        tabs = document.querySelectorAll('.info-header-tab'),
        tabsContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
       for (let i = a; i < tabsContent.length; i++ ) {
        tabsContent[i].classList.remove('show');
        tabsContent[i].classList.add('hide');
       }
    }     
    hideTabContent(1);

    function showTabContent(b) {
        if (tabsContent[b].classList.contains('hide')) {
            tabsContent[b].classList.remove('hide');
            tabsContent[b].classList.add('show');
        }
    }

    header.addEventListener('click', function(event) {
        theTarget = event.target;
        if (theTarget && theTarget.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
                if (theTarget == tabs[i]) {
                  hideTabContent(0);
                  showTabContent(i);  
                }
            }    
        }

    })  
//timer
    function calculateTimer(endtime) {
        let timeDiffInSeconds = (Date.parse(endtime) - Date.now())/1000,
            d, h, m, s, resultObj;
        d = Math.floor(timeDiffInSeconds/60/60/24);
        h = Math.floor(timeDiffInSeconds/60/60 % 24);
        m = Math.floor(timeDiffInSeconds/60 % 60);
        s = Math.floor(timeDiffInSeconds % 60);

        resultObj = {
            total: timeDiffInSeconds,
            days: d,
            hours: h,
            minutes: m,
            seconds: s,
        };

        for (key in resultObj) {
            if (resultObj[key] < 10) {
                resultObj[key] = "0" + resultObj[key];
            }
        }

        return resultObj;
    }

    function setClock(id, endtime) {
        let parentId = document.getElementById(id),
            getDays = parentId.querySelector('.days'),
            getHour = parentId.querySelector('.hours'),
            getMinutes = parentId.querySelector('.minutes'),
            getSeconds = parentId.querySelector('.seconds');
        

        if (Date.now() < Date.parse(endtime)) {
            setInterval(updateClock, 1000);
            function updateClock() {
                let timeObj = calculateTimer(endtime);

                newSpanforString.textContent = " " + dayAsRusWord(+timeObj.days) + " - ";
                getDays.textContent = +timeObj.days;
                getHour.textContent = timeObj.hours;
                getMinutes.textContent = timeObj.minutes;
                getSeconds.textContent = timeObj.seconds;
            }
        }
        function dayAsRusWord(dayAsNumber) {
            let dayAsRusWord; 
            switch(dayAsNumber){
            case 1:
                dayAsRusWord = "День";
                break;
            case 2:
            case 3:
            case 4:
                dayAsRusWord = "Дня";
                break;
            default:
                dayAsRusWord = "Дней";
                break;    
            }
            return dayAsRusWord;
        }
    };


    //add elemnt for days counting
    let getTimeNumbers = document.querySelector('.timer-numbers'),
        newSpanforVariable = document.createElement("span"),
        newSpanforString = document.createElement("span");
        
    newSpanforVariable.setAttribute('class', 'days');
    getTimeNumbers.insertBefore(newSpanforString, getTimeNumbers.firstChild);
    getTimeNumbers.insertBefore(newSpanforVariable, getTimeNumbers.firstChild);

    const deadline = new Date("2019/07/27");

    setClock('timer', deadline);


    //modal window

    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        popupBtn = document.querySelector('.popup-close');

    moreBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    popupBtn.addEventListener('click', function() {
        overlay.style.display = '';
        moreBtn.classList.remove('more-splash');
        document.body.style.overflow = 'visible';
    });


    //send form

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

}) // end DOMContentLoaded


// Slider

let sliderIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');


showSlides(sliderIndex);

function showSlides(n) {
    if (n > slides.length) {
        sliderIndex = 1
    }
    if (n < 1) {
        sliderIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    // for (let i = 1; i < slides.length; i++) {
    //     slides[i].item.style.display = 'none'
    // }

    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[sliderIndex - 1].style.display = 'block';
    dots[sliderIndex - 1].classList.add('dot-active');

}; //end show slides


let intSwichOn = false;
let repeatSlides;

function plusSlider(n) {
    showSlides(sliderIndex += n);
};
function currentSlide(n) {
    showSlides(sliderIndex = n)
};
 
prev.addEventListener('click', function() {
    plusSlider(-1);
    if (intSwichOn == true) {clearInterval(repeatSlides)};
    repeatSlides = setInterval(() => {plusSlider(-1)}, 2000);
    intSwichOn = true;
});
next.addEventListener('click', function() {
    plusSlider(1);
    if (intSwichOn == true) {clearInterval(repeatSlides)};
    repeatSlides = setInterval(() => {plusSlider(1)}, 2000);
    intSwichOn = true;
});



dotsWrap.addEventListener('click', function(e) {
    for (let i = 0; i < dots.length; i++) {
        if (e.target.classList.contains('dot') && e.target == dots[i]) {
           currentSlide(i + 1) 
        }
    }
})



