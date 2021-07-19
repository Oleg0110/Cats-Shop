
//Get Cats ==============

let cats = []
let oldcats = []
const size = 6;
let count = 1;


function renderCats() {
   let k = 0;
   const choice = document.getElementById("cats__choice")
   choice.innerHTML = '';
   const div = document.createElement("div")
   div.classList.add("cats__info")

   cats.forEach((cat, ind) => {

      if (k >= size * count) return;

      const div = document.createElement("div")
      div.classList.add("cats__info")
      div.innerHTML = `
      <div class="cats__imgs">
         <img src="${cat.img}" class="cats__img" alt="Cat Image">
         <div class="cats__like" id="cats__like">
            <img src="../assets/img/like.png" onclick="pressLike(${ind})" class="cats__like"  alt="Like" id="like${ind}">
         </div>
         <div class="cats__discount" id="cats__discount"><span>${cat.sale}</span></div>
      </div>
      <div class="cats__content">
         <h2 class="cats__name">${cat.name}</h2>
         <div class="cats__description">
            <span class="cats__color">${cat.color}</span>
            <span class="cats__corect-age"><span>${cat.age} мес.</span> <br> Age</span>
            <span class="cats__corect-paws"><span>${cat.paws}</span> <br> Paws</span>
         </div>
         <p class="cats__corect-price">${cat.price} $</p>
      </div>
      <button class="cats__button-buy"><span>Buy</span></button>`

      choice.appendChild(div);

      k++;
   });

}

async function getCats() {
   const res = await fetch("../json/cats.json");
   return await res.json()
}

getCats().then((data) => {
   cats = data.cats;

   document.getElementById("header__title").innerHTML = `Found ${cats.length} cats`;
   oldcats = [...cats];

   renderCats()
})
   .catch((err) => err);

//=====================================


// Show more cats
const moreCats = document.getElementById('cats__button');

moreCats.addEventListener('click', more);

function more() {
   count++;
   renderCats()
}
// ===========

//Add to chosen ========


function pressLike(ind) {
   const add = document.getElementById("add_to_chosen")

   let btn = document.getElementById("like" + ind)
   if (btn.style.opacity === "2") {
      btn.style.opacity = "0.5"
   }
   else {
      btn.style.opacity = "2";
   }
   add.classList.add('add-sidebar-opened');
   hideSidebar = () => { add.classList.remove('add-sidebar-opened') }
   setTimeout(hideSidebar, 2000)
}

// ===============

// Sort age and price =====
const pricesSort = document.getElementById('cats__price-sort');
const agesSort = document.getElementById('cats__age-sort');

const priceArrow = document.getElementById("cats__price-arrow");
const ageArrow = document.getElementById("cats__age-arrow");

let sort = {
   age: false,
   price: false
}

pricesSort.addEventListener('click', () => {
   priceArrow.classList.toggle("cats__up-arrow")

   priceSort()
});

agesSort.addEventListener('click', () => {
   ageArrow.classList.toggle("cats__up-arrow")

   ageSort()
})

function priceSort() {
   if (!sort.price) {
      cats.sort((first, second) => {

         if (first.price > second.price) {
            return 1
         }
         else if (first.price < second.price) {
            return -1

         }
         else {
            return 0
         }
      })

      sort.price = true
   }
   else {
      cats.sort((first, second) => {

         if (first.price < second.price) {
            return 1
         }
         else if (first.price > second.price) {
            return -1

         }
         else {
            return 0
         }
      })
      sort.price = false;
   }

   renderCats()
}
function ageSort() {
   // cats.sort((first, second) => {
   //    if (first.age > second.age) {
   //       return 1
   //    }
   //    else if(first.age < second.age){
   //       return -1
   //    }
   // else{
   //    return 0
   // }
   // })

   if (!sort.age) {
      cats.sort((first, second) => {
         return first.age > second.age && 1 || first.age < second.age && -1 || 0
      })
      sort.age = true;
   }
   else {
      cats.sort((first, second) => {
         return first.age < second.age && 1 || first.age > second.age && -1 || 0
      })
      sort.age = false;
   }

   renderCats()
}

// ================


// Button Function ===
const follBtn = document.getElementById('promo__button');
const banner = document.getElementById('thanks');
const load = document.getElementById('wrapper')
const info = document.getElementById('thanks__info')
const closeInfo = document.getElementById('thanks__close')
const getMail = document.getElementById('email')
const emailErr = document.getElementById("error")
let currentEmail;
let emails = []

function sendEmail() {
   currentEmail = getMail.value

   if (currentEmail === "") {
      emailErr.classList.add("error-sidebar-opened")
      hideSidebar = () => { emailErr.classList.remove('error-sidebar-opened') }
      setTimeout(hideSidebar, 2000)
   }
   else {
      emails.push(currentEmail)
      oppenBanner()
   }
}

function oppenBanner() {
   banner.style.display = '';
   load.style.display = ''

   banner.classList.add("thanks-opened");

   hideBanner = () => { banner.classList.remove("thanks-opened") };
   setTimeout(hideBanner, 1000);

   addFlex = () => {
      banner.style.display = 'flex';
      info.style.display = 'block';
      load.style.display = 'none'
   }
   setTimeout(addFlex, 1000);

   deleteBanner = () => {
      banner.style.display = 'none';
      info.style.display = 'none'
   }
   setTimeout(deleteBanner, 3000)

   closeInfo.addEventListener('click', () => {
      banner.style.display = 'none'
   })
}

follBtn.addEventListener('click', sendEmail);

follBtn.addEventListener('click', (e) => {
   e.preventDefault()
})


// ===============
