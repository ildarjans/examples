function modal() {
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

};

module.export = modal;
