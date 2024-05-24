const typeWritterEffectLocation = document.querySelector(".about-me__span");
const projectsList = document.querySelector(".projects__list");
window.onload = function() {
    // Reset the form fields when the page loads
    document.querySelector(".contact-form").reset();
}
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
// setTimeout(() => startTypingEffectWhenInView(typeWritterEffectLocation), 2000);
projectsList.onmousedown = function() {return false;}

//with help from chat gpt
let isMouseDown = false;
let startX;
let scrollLeft;

projectsList.addEventListener('mousedown', (e) => {
    projectsList.style.cursor = "grabbing";
  isMouseDown = true;
  startX = e.pageX - projectsList.offsetLeft;
  scrollLeft = projectsList.scrollLeft;
});

projectsList.addEventListener('mouseleave', () => {
  isMouseDown = false;
  projectsList.style.cursor = "grab";
});

projectsList.addEventListener('mouseup', () => {
  isMouseDown = false;
  projectsList.style.cursor = "grab";
});

projectsList.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  projectsList.style.cursor = "grabbing";
  e.preventDefault();
  const x = e.pageX - projectsList.offsetLeft;
  const walk = (x - startX) * 2;
  projectsList.scrollLeft = scrollLeft - walk;
});

projectsList.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  const step = 100; 
  projectsList.scrollLeft += delta * step;
});


projectsList.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  projectsList.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    const step = 1;
    projectsList.scrollLeft += delta * step;
  });

  
  document.getElementById(".contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.web3forms.com/submit", true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = "success.html"; // Redirect to the success page
        }
    };
    
    xhr.send(formData);
});