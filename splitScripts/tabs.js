function tabs() {
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
}

module.export = tabs;