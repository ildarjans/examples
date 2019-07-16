function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    totalPrint = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = this.value;
        totalPrint = (daysSum + personsSum) * 4000;

        if (restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        }
        else {
            totalValue.innerHTML = totalPrint;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = this.value;
        totalPrint = (daysSum + personsSum) * 4000;

        if (restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        }
        else {
            totalValue.innerHTML = totalPrint;
        }
    });

    place.addEventListener('change', function() {
        if (persons.value == "" || restDays.value == "") {
            totalValue.innerHTML = 0;
        }
        else {
            let tmp = totalPrint
            totalValue.innerHTML = tmp * this.options[this.selectedIndex].value;

        }
    })
};

module.export = calc;