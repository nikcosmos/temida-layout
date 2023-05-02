import Swiper, { Navigation, Pagination, Zoom } from 'swiper';

import scrollIntoView from 'scroll-into-view-if-needed';
import tippy from 'tippy.js';

//Body Status========================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('lock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
export let bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight =
				window.innerWidth -
				document.querySelector('#wrapper').offsetWidth +
				'px';
		}
		body.style.paddingRight =
			window.innerWidth -
			document.querySelector('#wrapper').offsetWidth +
			'px';
		document.documentElement.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
//Burger========================================================================================================================================================
export function menuInit() {
	if (document.querySelector('.icon-menu')) {
		document.addEventListener('click', function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle('menu-open');
			}
		});
	}
}
export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add('menu-open');
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove('menu-open');
}
//Switch Words========================================================================================================================================================
!(function initWordSwitcher() {
	const WORDCLASS = {
		START: 'word-start',
		ACTIVE: 'word-active',
		END: 'word-end',
	};

	wordSwitcher();

	function wordSwitcher() {
		const switchList = document.querySelectorAll('[data-words]');
		switchList.length &&
			switchList.forEach((item) => {
				const wordList = [...item.children];
				let wordActive = 0;

				setInterval(() => {
					changeWord();
				}, 2000);

				function changeWord() {
					const activeEl = wordList[wordActive];
					const prevEl = activeEl.previousElementSibling;
					const nextEl = activeEl.nextElementSibling;
					activeEl &&
						changeClasses(activeEl, WORDCLASS.END, WORDCLASS.ACTIVE);
					prevEl && changeClasses(prevEl, WORDCLASS.START, WORDCLASS.END);
					nextEl &&
						changeClasses(nextEl, WORDCLASS.ACTIVE, WORDCLASS.START);
					if (wordActive === wordList.length - 1) {
						changeClasses(wordList[0], WORDCLASS.ACTIVE, WORDCLASS.START);
						wordActive = 0;
						return;
					}
					if (wordActive === 0)
						changeClasses(wordList[6], WORDCLASS.START, WORDCLASS.END);

					wordActive++;
				}
			});
	}

	function changeClasses(el, addClass, removeClass) {
		el.classList.remove(removeClass);
		el.classList.add(addClass);
	}
})();
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
	});
	const nextButtons = document.querySelectorAll('.next-icon-js');
	nextButtons.length &&
		nextButtons.forEach((button) => {
			button.addEventListener('click', () => {
				stepSlider.slideNext();
			});
		});
})();
//SmoothScrooll========================================================================================================================================================
!(function initMainPageScroll() {
	const goTopBtn = document.getElementById('goTopForm');
	goTopBtn &&
		goTopBtn.addEventListener('click', (el) => {
			scrollIntoView(document.getElementById('topSection'), {
				behavior: 'smooth',
				scrollMode: 'if-needed',
			});
		});
})();
//CheckBoxItem========================================================================================================================================================
!(function checkBoxItem() {
	const checkBoxList = document.querySelector('.checkBoxList');
	checkBoxList &&
		checkBoxList.addEventListener('click', (el) => {
			if (!el.target.classList.contains('checkbox-item')) return;
			el.target.classList.toggle('active');
		});
	const tippiTemp = document.getElementById('tippiTemp');
	const tippiList = document.querySelectorAll('.tippiItem');
	tippiList.length &&
		tippiList.forEach((item) => {
			tippy(item, {
				placement: window.innerWidth > 991 ? 'right-start' : 'auto',
				content: tippiTemp.innerHTML,
				maxWidth: 'none',
				allowHTML: true,
				trigger: 'click',
				animation: 'scale',
				interactive: true,
			});
		});
})();
//Basket========================================================================================================================================================
!(function initBasket() {
	const basketBtn = document.getElementById('basketBtn');
	const basketModal = document.getElementById('basketContent');
	basketBtn &&
		basketBtn.addEventListener('click', () => {
			basketModal.classList.add('active');
			bodyLock();
		});
	basketModal &&
		basketModal.addEventListener('click', (el) => {
			if (
				el.target.classList.contains('basket-mobile') ||
				el.target.classList.contains('basket-mobile__body') ||
				el.target.classList.contains('basket-mobile__close-btn')
			) {
				basketModal.classList.remove('active');
				bodyUnlock();
			}
			if (el.target.classList.contains('basket-scroll-btn')) {
				basketModal.classList.remove('active');
				bodyUnlock();
				formScroll();
			}
		});
})();
//FormScroll========================================================================================================================================================
!(function initFormScroll() {
	const goFormBtn = document.getElementById('goFormBtn');
	goFormBtn && goFormBtn.addEventListener('click', formScroll);
})();
function formScroll() {
	scrollIntoView(document.getElementById('formSection'), {
		behavior: 'smooth',
		scrollMode: 'if-needed',
		block: 'start',
		nearest: document.getElementById('formSection'),
	});
}
//FormPopup========================================================================================================================================================
!(function formPopupInit() {
	const popupSlider = new Swiper('#popupSlider', {
		modules: [Pagination, Navigation, Zoom],
		slidesPerView: 1,
		spaceBetween: 20,
		disable: true,
		grabCursor: true,
		zoom: true,
		pagination: {
			el: '#popupBullets',
			type: 'bullets',
		},
		navigation: {
			nextEl: '#popupNextBtn',
			prevEl: '#popupPrevBtn',
		},
		breakpoints: {
			0: {
				centeredSlides: true,
			},
		},
	});

	const formPopup = document.getElementById('formPopup');
	const formPopupBtnsList = document.querySelectorAll('[data-form-popup]');

	formPopupBtnsList.length &&
		formPopupBtnsList.forEach((btn) => {
			btn.addEventListener('click', () => {
				formPopup.classList.add('_popup-open');
				popupSlider.enable();
				bodyLock();
			});
		});

	formPopup &&
		formPopup.addEventListener('click', (el) => {
			if (
				el.target.classList.contains('popup__close-btn') ||
				el.target.classList.contains('popup ') ||
				el.target.classList.contains('popup__body')
			) {
				formPopup.classList.remove('_popup-open');
				popupSlider.disable();
				bodyUnlock();
			}
		});
})();
