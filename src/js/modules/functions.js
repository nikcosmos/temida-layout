import Swiper from 'swiper'
import scrollIntoView from 'scroll-into-view-if-needed'

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      let webP = new Image()
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
   }
   // Добавление класса _webp или _no-webp для HTML
   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp'
      document.documentElement.classList.add(className)
   })
}

//Body Status========================================================================================================================================================
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay)
   } else {
      bodyLock(delay)
   }
}
export let bodyUnlock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index]
            el.style.paddingRight = '0px'
         }
         body.style.paddingRight = '0px'
         document.documentElement.classList.remove('lock')
      }, delay)
      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
export let bodyLock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index]
         el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      document.documentElement.classList.add('lock')

      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
//Burger========================================================================================================================================================
export function menuInit() {
   if (document.querySelector('.icon-menu')) {
      document.addEventListener('click', function (e) {
         if (bodyLockStatus && e.target.closest('.icon-menu')) {
            bodyLockToggle()
            document.documentElement.classList.toggle('menu-open')
         }
      })
   }
}
export function menuOpen() {
   bodyLock()
   document.documentElement.classList.add('menu-open')
}
export function menuClose() {
   bodyUnlock()
   document.documentElement.classList.remove('menu-open')
}
//Switch Words========================================================================================================================================================
!(function initWordSwitcher() {
   const WORDCLASS = {
      START: 'word-start',
      ACTIVE: 'word-active',
      END: 'word-end',
   }

   wordSwitcher()

   function wordSwitcher() {
      const switchList = document.querySelectorAll('[data-words]')
      switchList &&
         switchList.forEach((item) => {
            const wordList = [...item.children]
            let wordActive = 0

            setInterval(() => {
               changeWord()
            }, 2000)

            function changeWord() {
               const activeEl = wordList[wordActive]
               const prevEl = activeEl.previousElementSibling
               const nextEl = activeEl.nextElementSibling
               activeEl && changeClasses(activeEl, WORDCLASS.END, WORDCLASS.ACTIVE)
               prevEl && changeClasses(prevEl, WORDCLASS.START, WORDCLASS.END)
               nextEl && changeClasses(nextEl, WORDCLASS.ACTIVE, WORDCLASS.START)
               if (wordActive === wordList.length - 1) {
                  changeClasses(wordList[0], WORDCLASS.ACTIVE, WORDCLASS.START)
                  wordActive = 0
                  return
               }
               if (wordActive === 0) changeClasses(wordList[6], WORDCLASS.START, WORDCLASS.END)

               wordActive++
            }
         })
   }

   function changeClasses(el, addClass, removeClass) {
      el.classList.remove(removeClass)
      el.classList.add(addClass)
   }
})()
//StepsSwiper========================================================================================================================================================
!(function stepsSwiperInit() {
   const stepSlider = new Swiper('#steps-swiper', {
      watchOverflow: true,
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         575: {
            slidesPerView: 2,
         },
         767: {
            slidesPerView: 5,
         },
      },
   })
   const nextButtons = document.querySelectorAll('.next-icon-js')
   nextButtons &&
      nextButtons.forEach((button) => {
         button.addEventListener('click', () => {
            stepSlider.slideNext()
         })
      })
})()
//SmoothScrooll========================================================================================================================================================
!(function mainPageScroll() {
   const goTopBtn = document.getElementById('goTopForm')
   goTopBtn &&
      goTopBtn.addEventListener('click', (el) => {
         scrollIntoView(document.getElementById('topSection'), {
            behavior: 'smooth',
            scrollMode: 'if-needed',
         })
      })
})()
