"use strict"

const size = 6;
const moreCats = document.getElementById('cats__button');
const pricesSort = document.getElementById('cats__price-sort');
const agesSort = document.getElementById('cats__age-sort');
const priceArrow = document.getElementById("cats__price-arrow");
const ageArrow = document.getElementById("cats__age-arrow");
const followBtn = document.getElementById('promo__button');
const banner = document.getElementById('thanks__banner');
const load = document.getElementById('thanks__load');
const closeBanner = document.getElementById('thanks__close');
const getMail = document.getElementById('email');
const emailErr = document.getElementById("error");

let cats = []
let count = 1;
let modalTimerId = -1;
let sort = {
   age: false,
   price: false
}
let currentEmail;
let emails = [];

moreCats.addEventListener('click', showMoreCats);

pricesSort.addEventListener('click', () => {
   priceArrow.classList.toggle("cats__up-arrow");

   priceSort()
});

agesSort.addEventListener('click', () => {
   ageArrow.classList.toggle("cats__up-arrow");

   ageSort()
});

followBtn.addEventListener('click', sendEmail);

function renderCats() {
   const choice = document.getElementById("cats__choice");
   choice.innerHTML = '';
   const div = document.createElement("div");
   div.classList.add("cats__info");

   cats.forEach((cat, ind) => {
      if (ind >= size * count) return;

      const div = document.createElement("div");
      div.classList.add("cats__info");
      div.innerHTML = `
      <div class="cats__imgs">
         <img src="${cat.img}" class="cats__img" alt="Cat Image">
         <div class="cats__likes" onclick="modifyCat(${cat.id})" id="cats__likes">
            <img src="../assets/img/like.png" onclick="pressLike(${cat.id})" class="cats__like"  alt="Like" id="like${cat.id}">
         </div>
         <div class="cats__discount" id="cats__discount"><span>${cat.sale}</span></div>
      </div>
      <div class="cats__content">
         <h2 class="cats__name">${cat.name}</h2>
         <div class="cats__description">
            <span class="cats__color">${cat.color}</span>
            <span class="cats__corect-age"><span>${cat.age} months</span> <br> Age</span>
            <span class="cats__corect-paws"><span>${cat.paws}</span> <br> Paws</span>
         </div>
         <p class="cats__corect-price">${cat.price} $</p>
      </div>
      <button class="cats__button-buy"><span>Buy</span></button>`;

      choice.appendChild(div);
      
      if (cat.isLiked) {
         let btn = document.getElementById("like" + cat.id);
         btn.classList.toggle('cats__like--pressed')
      }

   });

}

function modifyCat(id) {

   const findedCat = cats.find((data) => data.id === id);
   
   findedCat.isLiked = !findedCat.isLiked;

   const remove = document.getElementById("remove_from_favorites");
   const add = document.getElementById("add_to_favorites");

   if (findedCat.isLiked) {
      remove.classList.remove('remove-from-favorites-opened');
      if (modalTimerId > -1) {
         clearTimeout(modalTimerId)
         modalTimerId = addToFavorites()
      }
      else {
         modalTimerId = addToFavorites()
      }
   }
   else {
      add.classList.remove('add-to-favorites-opened');
      if (modalTimerId > -1) {
         clearTimeout(modalTimerId)
         modalTimerId = removeFromFavorites()
      }
      else {
         modalTimerId = removeFromFavorites()
      }
   }


}

function pressLike(id) {
   let btn = document.getElementById("like" + id);
   btn.classList.toggle('cats__like--pressed')
}

function showMoreCats() {
   count++
   renderCats()

   if (count * size >= cats.length) {
      moreCats.style.display = "none"
   }
}

function addToFavorites() {
   const add = document.getElementById("add_to_favorites");
   add.classList.add('add-to-favorites-opened');

   let hideSidebar = () => {
      add.classList.remove('add-to-favorites-opened');
   }
   if (modalTimerId > -1) {
      clearTimeout(modalTimerId);
      modalTimerId = setTimeout(hideSidebar, 2000);
   }
   else {
      modalTimerId = setTimeout(hideSidebar, 2000);
   }
}

function removeFromFavorites() {
   const remove = document.getElementById("remove_from_favorites");
   remove.classList.add('remove-from-favorites-opened');

   let hideSidebar = () => {
      remove.classList.remove('remove-from-favorites-opened');
   }
   if (modalTimerId > -1) {
      clearTimeout(modalTimerId);
      modalTimerId = setTimeout(hideSidebar, 2000);
   }
   else {
      modalTimerId = setTimeout(hideSidebar, 2000);
   }
}


function priceSort() {
   if (!sort.price) {
      cats.sort((first, second) => {
         return first.price - second.price || second.price - first.price
      })
      sort.price = true;
   }
   else {
      cats.sort((first, second) => {
         return second.price - first.price || first.price - second.price
      })
      sort.price = false;
   }

   renderCats()
}

function ageSort() {
   if (!sort.age) {
      cats.sort((first, second) => {
         return first.age - second.age || second.age - first.age
      })
      sort.age = true;
   }
   else {
      cats.sort((first, second) => {
         return second.age - first.age || first.age - second.age
      })
      sort.age = false;
   }

   renderCats()
}

function sendEmail(e) {
   currentEmail = getMail.value

   if (currentEmail === "") {
      emailErr.classList.add("error-sidebar-opened");
      let hideSidebar = () => {
         emailErr.classList.remove('error-sidebar-opened');
      };

      if (modalTimerId > -1) {
         clearTimeout(modalTimerId);
         modalTimerId = setTimeout(hideSidebar, 2000);
      }
      else {
         modalTimerId = setTimeout(hideSidebar, 2000);
      }
   }
   else {
      emails.push(currentEmail);
      console.log(emails);
      oppenBanner(e);
   }
}

function oppenBanner(e) {
   load.style.display = 'flex';
   let hideLoad = () => {
      load.style.display = 'none'
      banner.style.display = 'flex'
      let hideBanner = () => {
         banner.style.display = 'none'
      }
      if (modalTimerId > -1) {
         clearTimeout(modalTimerId);
         modalTimerId = setTimeout(hideBanner, 3000);
      }
      else {
         modalTimerId = setTimeout(hideBanner, 3000);
      }

   };
   setTimeout(hideLoad, 1000);


   banner.addEventListener('click', () => {
      banner.style.display = 'none'
   })

   closeBanner.addEventListener('click', () => {
      banner.style.display = 'none'
   })
   e.preventDefault(e)
}

function setFoundedCats(count) {
   document.getElementById("header__title")
      .innerHTML = `Found ${count} cats`;
}

async function getCats() {
   const res = await fetch("../json/cats.json");
   return await res.json()
}

getCats().then((data) => {
   cats = data.cats;
   setFoundedCats(cats.length)

   renderCats()
})
   .catch((err) => err);


















// ===============
