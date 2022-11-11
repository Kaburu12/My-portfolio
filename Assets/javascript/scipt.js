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
emailIcon.addEventListener("click", click2)

function click2() {
  alert("My Email : Kabururm@gmail.com")
}

//onclick on the hire button
const hire = document.getElementsByClassId('hire');
emailIcon.addEventListener("click", click3)
function click3(){
  alert(`${"CALL : +254796225100"} \n ${"My Email : Kabururm@gmail.com"}` );

}