window.addEventListener('DOMContentLoaded', function() {
    
    "use strict";
    let tabs = require('./js/splitScripts/tabs.js'),
        timer = require('./splitScripts/timer.js'),
        modal = require('./splitScripts/modal.js'),
        form = require('./splitScripts/form'),
        slider = require('./splitScripts/slider.js'),
        calc = require('./splitScripts/calc.js');

    
    tabs();
    timer();
    form();
    slider();
    calc();
}) 