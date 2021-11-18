"use strict";

let scrolled;
let timer;
let btn = document.getElementById("to-top")

document.getElementById("to-top").onclick = function () {
   scrolled = window.pageYOffset;
   scrollToTop()
}

function scrollToTop() {
   if (scrolled > 0) {
      window.scrollTo(0, scrolled)
      scrolled = scrolled - 100;
      timer = setTimeout(scrollToTop, 10);
   }
   else {
      clearTimeout(timer);
      window.scrollTo(0, 0)
   }
}

function getScroll() {
   if (window.pageYOffset > 100) {
      btn.style.display = ''
   }
   else {
      btn.style.display = 'none'
   }
}

window.onscroll = getScroll
btn.style.display = 'none'

