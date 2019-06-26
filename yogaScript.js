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

const deadline = new Date("2019/06/27");

setClock('timer', deadline);