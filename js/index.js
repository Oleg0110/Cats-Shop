let cats = []
let oldcats = []
const size = 6;
let count = 1;


function getResultCats() {
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
            <span class="cats__corect-age"><span>${cat.age} мес.</span> <br> Возраст</span>
            <span class="cats__corect-paws"><span>${cat.paws}</span> <br> Кол-во лап</span>
         </div>
         <p class="cats__corect-price">${cat.price} руб.</p>
      </div>
      <button class="cats__button-buy"><span>${cat.buy}</span></button>`

      choice.appendChild(div);







      // if (cat.sale === String) {
      //    console.log('sjjjjhh');
      //    const sale = document.getElementById("cats__discount");
      //    return sale.style.display = 'block'
      // }

      k++;
   });

}

async function getCats() {
   const res = await fetch("../json/cats.json");
   return await res.json()
}

getCats().then((data) => {
   cats = data.cats;

   document.getElementById("header__title").innerHTML = `Найдено ${cats.length} котов`;
   oldcats = [...cats];

   getResultCats()
})
   .catch((err) => err);

// Show more cats
const moreCats = document.getElementById('cats__button');

moreCats.addEventListener('click', more);


function more() {
   count++;
   getResultCats()
}
// ===========

//Add to chosen ========

// const pressesLikes = document.getElementById("like" + ind)
// pressesLike.addEventListener('click', pressLike)

function pressLike(ind) {
   const likes = document.getElementById("like" + ind);
   const add = document.getElementById("add_to_chosen")

   likes.addEventListener('click', () => {
      add.classList.add('add-sidebar-opened');

      hideSidebar = () => { add.classList.remove('add-sidebar-opened') }
      setTimeout(hideSidebar, 2000)
   })

   let btn = document.getElementById("like" + ind)
   if (btn.style.opacity === "2") {
      btn.style.opacity = "0.5"
   }
   else {
      btn.style.opacity = "2";

   }
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

   getResultCats()
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
      // cats = [...oldcats];
      sort.age = false;
   }

   // if (!sort.age) {
   //    cats.sort((first, second) => {
   //       return first.age > second.age && 1 || first.age < second.age && -1 || 0
   //    })
   //    sort.age = true;
   // }
   // else {
   //    // cats.sort((first, second) => {
   //    //    return first.age < second.age && 1 || first.age > second.age && -1 || 0
   //    // })
   //    sort.age = false;
   // }

   getResultCats()
}

// ================


// Button Function ===
// const follBtn = document.getElementById('promo__button');
// const banner = document.getElementById('thanks');
// const load = document.getElementById('wrapper')
// const info = document.getElementById('thanks__info')
// const closeInfo = document.getElementById('thanks__close')
// const getMail = document.getElementById('email')
// const emailErr = document.getElementById("error")
// let currentEmail = []

// function sendEmail() {
//    currentEmail = getMail.value

//    if (currentEmail === "") {
//       emailErr.classList.add("error-sidebar-opened")
//       hideSidebar = () => { emailErr.classList.remove('error-sidebar-opened') }
//       setTimeout(hideSidebar, 2000)
//    }
//    else {
//       console.log(currentEmail);
//    }
// }
// follBtn.addEventListener('click', sendEmail);

// function oppenBanner() {
//    banner.classList.add("thanks-opened");

//    hideBanner = () => { banner.classList.remove("thanks-opened") };
//    setTimeout(hideBanner, 1000);

//    addFlex = () => {
//       banner.style.display = 'flex';
//       info.style.display = 'block';
//       load.style.display = 'none'
//    }
//    setTimeout(addFlex, 1000);

//    deleteBanner = () => {
//       banner.style.display = 'none';
//       info.style.display = 'none'
//    }
//    setTimeout(deleteBanner, 5000)

//    closeInfo.addEventListener('click', () => {
//       banner.style.display = 'none'
//    })
// }

// function getUser() {
//    userEmail = getMail.value
//    if (userEmail === "") {
//       emailErr.classList.add("error-sidebar-opened")
//       hideSidebar = () => { emailErr.classList.remove('error-sidebar-opened') }
//       setTimeout(hideSidebar, 2000)
//    }
//    else {
//       let users = [{ user: { userEmail: `${userEmail}` } }]

//       console.log(users);
//       oppenBanner()
//    }
// }

// follBtn.addEventListener('click', () => {
//    getUser()
// })

// follBtn.addEventListener('click', (e) => {
//    e.preventDefault()
// })



// ===============


//Send Users email=====
// class SendEmailTo
// async post(){

// }

// fetch("../json/users.json", {
//    method: 'POST',
//    body: getUser()
// })
//====================