"use strict";

const mainMenu = document.getElementById("header__links");
const closeMenu = document.getElementById("header__close-menu");
const openMenu = document.getElementById("header__burger-menu");
const logo = document.getElementById("header__logo");

openMenu.addEventListener('click', showMenu);
closeMenu.addEventListener('click', closeMainMenu);

function showMenu() {
   mainMenu.style.display = 'flex';
   mainMenu.style.left = '0';
   openMenu.style.display = 'none';
   logo.style.display = 'none';
};

function closeMainMenu() {
   mainMenu.style.left = '-100%';
   openMenu.style.display = 'block';
   logo.style.display = 'block';
};