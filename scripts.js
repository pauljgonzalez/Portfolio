const typeWritterEffectLocation = document.querySelector(".about-me__span");
//array for type writer effect
const typeArray = [
    "Frontend Developer",
    "Video Game Enjoyer",
    "Gym Enthusiast"
];
//index for typeArray
let index = 0;
function getArrayIndex() {
    index = (index + 1) % typeArray.length;
    return index;
}
//element is .about-me__span, text is a phrase in thte array
function typingEffectAdd(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text[i];
        setTimeout(() => typingEffectAdd(element, text, i + 1), 150);
    } else {
        setTimeout(() => typingEffectRemove(element), 1500); 
    }
}
function typingEffectRemove(element, i = element.textContent.length - 1) {
    if (i >= 0) {
        element.textContent = element.textContent.slice(0, i);
        setTimeout(() => typingEffectRemove(element, i - 1), 150);
    } else {
        // Wait before adding the next phrase
        setTimeout(() => typingEffectAdd(element, typeArray[getArrayIndex()]), 500); 
    }
}

function setFixedDimensions(element) {
    const rect = element.getBoundingClientRect();
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
}

function startTypingEffectWhenInView(element) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setFixedDimensions(element);
                // Start with removing text
                typingEffectRemove(element); 
                observer.unobserve(element);
            }
        });
    }, { threshold: 1.0 });
    observer.observe(element);
}
setTimeout(() => startTypingEffectWhenInView(typeWritterEffectLocation), 2000);