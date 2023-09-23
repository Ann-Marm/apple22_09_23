/* simplebar  - скролл в выпадашке country 
classNames - задаем свои классы скроллу */
new SimpleBar(document.querySelector('.country__list'), {
  classNames: {
    scrollbar: 'country__scrollbar',
    track: 'country__track'
  }
})



/* полный слайдер - работает с ошибкой */
/*import Swiper from '../lib/swiper-bundle.min.js';*/

/* модульный слайдер с компа не работает */
/*import Swiper from '../lib/swiper-bundle.min.mjs'; */

/* модульный слайдер - работает только с его сайта */
/* import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'; */

/* на сайте подключения Свайпера раньше была другая ссылка для браузера,
хз почему сейчас не рабочая, может починят
скачала файл из старого проекта - работает */
import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

/* проверка, что Swiper работает */
/* console.log(Swiper); */

new Swiper('.goods__block', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },

        1440: {
            slidesPerView: 3,
            spaceBetween: 24,
        },

    },
    navigation: {
        prevEl: '.goods__arrow_prev',
        nextEl: '.goods__arrow_next'
    },
    preventClicks: true,
    a11y: false,
});


/* modal */
const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');

productMore.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('modal_open');
  })
})

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('modal_open');
  }
});


/* когда кликаешь в инпут текст заготовка внутри -поднимается наверх */
const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((input, i) => {
  input.addEventListener('focus', () => {
    formPlaceholder[i].classList.add('form__placeholder_active');
  })

  input.addEventListener('blur', () => {
    if (input.value === '') {
      formPlaceholder[i].classList.remove('form__placeholder_active')
    }
  })
});





/* smoth scroll */

const smothScroll = (trigger) => {
    const SPEED = 0.3;
    const scrolled = e => {
      e.preventDefault();
      const target = e.target;
  
      if (target.matches('[href^="#"]')) {
        let start = 0;
        const pageY = window.pageYOffset;
        const hash = target.getAttribute('href');
  
        if (hash === '#') return;
  
        const elem = document.querySelector(hash);
        const coordinateElem = elem.getBoundingClientRect().top;
        const allDistance = pageY + coordinateElem;
        const scroll = time => {
          if (!start) start = time;
          const progress = time - start;
          const r = (coordinateElem < 0 ?
            Math.max(pageY - progress / SPEED, allDistance) :
            Math.min(pageY + progress / SPEED, allDistance));
  
          window.scrollTo(0, r);
  
          const scrolling = coordinateElem < 0 ?
            r > allDistance :
            r < allDistance;
          if (scrolling) requestAnimationFrame(scroll);
        }
        requestAnimationFrame(scroll)
      }
    }
    trigger.addEventListener('click', scrolled);
  }

  smothScroll(document.querySelector('.header__navigation'));
  smothScroll(document.querySelector('.footer__navigation'));



/*** price ***/

const dataCurrency = {};

const formatCurrency = (value, currency) => {
return new Intl.NumberFormat('EUR', {
  style: 'currency',
  currency,
  maximumFractionDigits: 2,
}).format(value)
}

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');

  priceElems.forEach(elem => {
    elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
  })
}

// showPrice(); 

/* с сайта котировки валют скрипт, но переделанное */


const myHeaders = new Headers();
myHeaders.append("apikey", "36xPzZYLB3Dd8bwRnXUlEU3rXoqFpqG5");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    //console.log('result', result);
    Object.assign(dataCurrency, result.rates)
    //console.log('dataCurrency', dataCurrency);
    showPrice();
  })
  .catch(error => console.log('error', error));
  
     /*** price end  ***/


      /* country choise */
      
  const coutnryBtn = document.querySelector('.country__btn');
  const countryWrapper = document.querySelector('.country__wrapper');

  coutnryBtn.addEventListener('click', () => {
    countryWrapper.classList.toggle('country__wrapper_open');
    })
  

    countryWrapper.addEventListener('click', ({target}) => {
      if (target.classList.contains('country__choise')) {
        countryWrapper.classList.remove('country__wrapper_open');
        showPrice(target.dataset.currency);
      }  
      });



/*** timer  01.01.1970 ***/ 

/* Склонение числительных */
const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

const timer = deadline => {

const unitDays = document.querySelector('.timer-unit_days');
const unitHours = document.querySelector('.timer-unit_hours');
const unitMinutes = document.querySelector('.timer-unit_minutes');

const descriptionDays = document.querySelector('.timer__unit-description_days');
const descriptionHours = document.querySelector('.timer__unit-description_hours');
const descriptionMinutes = document.querySelector('.timer__unit-description_minutes');


  const getTimeRemaning = () => {
    const dateStop = new Date(deadline).getTime();
  //  console.log('dateStop: ', dateStop)
    const dateNow = Date.now();
  //  console.log('dateNow: ', dateNow)
  const timeRemaning = dateStop - dateNow;

  /*
  const ms = timeRemaning;
  console.log('ms: ', ms)
  const s = timeRemaning / 1000 % 60;
  console.log('s: ', s)
  */
  const minutes = Math.floor(timeRemaning / 1000 / 60 % 60);
  console.log('minutes: ', minutes)
  const hours = Math.floor(timeRemaning / 1000 / 60 / 60 % 24);
  console.log('hours : ', hours )
  const days = Math.floor(timeRemaning / 1000 / 60 / 60 / 24);
  console.log('days: ', days)

  return {timeRemaning, minutes, hours, days}

  }
 // getTimeRemaning()
  const start = () => {
  const timer = getTimeRemaning();
  console.log('timer: ', timer);

  unitDays.textContent = timer.days;
  unitHours.textContent = timer.hours;
  unitMinutes.textContent = timer.minutes;

  descriptionDays.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']); 
  descriptionHours.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);  
  descriptionMinutes.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
  
  const timerId = setTimeout(start, 60000);

  if (timer.timeRemaning < 0) {
    clearTimeout(timerId)
    unitDays.textContent = '0';
    unitHours.textContent = '0';
    unitMinutes.textContent = '0';
    }

}
start();
}
  timer('2023/12/30 20:00') 

/*** timer  01.01.1970 end ***/ 
