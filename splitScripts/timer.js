function timer() {
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

    //add elements for days counting
    let getTimeNumbers = document.querySelector('.timer-numbers'),
        newSpanforVariable = document.createElement("span"),
        newSpanforString = document.createElement("span");
        
    newSpanforVariable.setAttribute('class', 'days');
    getTimeNumbers.insertBefore(newSpanforString, getTimeNumbers.firstChild);
    getTimeNumbers.insertBefore(newSpanforVariable, getTimeNumbers.firstChild);

    const deadline = new Date("2019/07/27");

    setClock('timer', deadline);

};

module.export = timer;
