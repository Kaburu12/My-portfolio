//slideshow functions
let slideIndex = 1;
showSlides(slideIndex);

function nextSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

//onclick on the phone icon
const input = document.getElementsByClassId('call');
  
function click1() {
  alert("CALL : +254796225100");
}

input.addEventListener('click', click1);

//onclick on the email
const emailIcon = document.getElementById('email');
  
function onClickAlert() {
  alert("EMAIL : kabururm@gmail.com");
}

emailIcon.addEventListener('click', onClickAlert);