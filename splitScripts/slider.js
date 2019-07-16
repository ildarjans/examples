function slider() {
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
};

module.export = slider;
