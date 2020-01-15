let elements;
let slideElements
let windowHeight;

const init = () => {
    elements = document.querySelectorAll('.hidden');
    slideElements = document.querySelectorAll('.hidden-slide');
    windowHeight = window.innerHeight;
}

const checkPositionFade = () => {
    for(let i = 0; i < elements.length; i++){
        let element = elements[i];
        let positionFromTop = elements[i].getBoundingClientRect().top;

        if(positionFromTop - windowHeight <= 0){
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

