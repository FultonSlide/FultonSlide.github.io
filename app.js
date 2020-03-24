let elements;
let slideElements
let windowHeight;
const images = document.querySelectorAll('[data-src]');

const preloadImage = img => {
    const src = img.getAttribute('data-src');

    if(!src){
        return;
    } else {
        img.src = src;
    }
};

const imgOptions = {
    threshold: 0,
    rootMargin: '0px 0px 500px 0px'
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

const init = () => {
    elements = document.querySelectorAll('.hidden');
    slideElements = document.querySelectorAll('.hidden-slide');
    windowHeight = window.innerHeight;
}

const checkPositionFade = () => {
    for(let i = 0; i < elements.length; i++){
        let element = elements[i];
        let positionFromTop = elements[i].getBoundingClientRect().top;

        if(positionFromTop - windowHeight <= 100){
            element.classList.add('fade-in-element');
            element.classList.remove('hidden');
        } else {
            element.classList.remove('fade-in-element');
            element.classList.add('hidden');
        }
    }
}

const checkPositionSlide = () => {
    for(let i = 0; i < slideElements.length; i++){
        let slideElement = slideElements[i];
        let positionFromTop = slideElement[i].getBoundingClientRect().bottom;

        if(positionFromTop - windowHeight <= 0){
            slideElement.classList.add('slide-in-element');
            slideElement.classList.remove('hidden-slide');
        } else {
            slideElement.classList.remove('slide-in-element');
            slideElement.classList.add('hidden-slide');
        }
    }
};

const checkPositions = () => {
    checkPositionFade();
    checkPositionSlide();
}

window.addEventListener('scroll', checkPositions);
window.addEventListener('resize', init);

init();
checkPositions();



