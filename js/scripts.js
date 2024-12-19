/*- offers-slider -*/
var swiper = new Swiper(".offers-slider", {
    autoplay: false,
    autoHeight: true,
    loop: false,
	slidesPerView: 3,
	slidesPerGroup: 1,
	spaceBetween: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
    0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: false,
        },
    768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: false,
        },
    },
});

/*- phone-field -*/
document.addEventListener('DOMContentLoaded', () => {
    // Универсальная функция для маски ввода телефона
    const formatPhoneInput = (phoneInput) => {
        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

            // Убеждаемся, что префикс "+998" всегда есть
            if (!value.startsWith('998')) {
                value = '998' + value;
            }

            // Ограничиваем длину до 12 символов (998 XX XXX XX XX)
            value = value.slice(0, 12);

            // Форматируем в маску +998 XX XXX XX XX
            const formattedValue = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`;
            phoneInput.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (event) => {
            // Если нажата клавиша Backspace
            if (event.key === 'Backspace') {
                const cursorPosition = phoneInput.selectionStart;
                const value = phoneInput.value;

                // Убедимся, что пользователь не может удалить "+998 "
                if (cursorPosition <= 5) {
                    event.preventDefault();
                    return;
                }

                // Если курсор перед символами форматирования (пробел)
                const prevChar = value[cursorPosition - 1];
                if (/\s/.test(prevChar)) {
                    event.preventDefault();

                    // Удаляем символ форматирования и перемещаем курсор
                    const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                    phoneInput.value = newValue;

                    // Устанавливаем новый курсор
                    phoneInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }
            }
        });

        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value || phoneInput.value === '+998') {
                phoneInput.value = '+998 ';
            }
        });

        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value === '+998 ') {
                phoneInput.value = ''; // Очищаем поле, если пользователь не ввел данные
            }
        });
    };

    // Применяем маску для всех элементов с классом phone-field
    const phoneInputs = document.querySelectorAll('.phone-field');
    phoneInputs.forEach((phoneInput) => {
        formatPhoneInput(phoneInput);
    });
});

/*- reviews-slider -*/
var swiper = new Swiper(".reviews-slider__in", {
    autoplay: false,
    autoHeight: true,
    loop: false,
	slidesPerView: 4,
	slidesPerGroup: 1,
	spaceBetween: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".reviews-slider .swiper-button-next",
		prevEl: ".reviews-slider .swiper-button-prev",
	},
	breakpoints: {
    0: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: false,
        },
    768: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: false,
        },
    },
});

/*- accordion -*/
const accordions = document.querySelectorAll('.accordion__title-panel');

accordions.forEach(accordion => {
	accordion.addEventListener('click', function () {
		this.classList.toggle('active');

		const panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
});

/*- info-widget -*/
const allLink = document.querySelector('.info-widget__all-link');
const hideLink = document.querySelector('.info-widget__hide-link');
const textWidget = document.querySelector('.info-widget__text');

// Добавляем обработчик на клик по allLink
allLink.addEventListener('click', () => {
    allLink.classList.add('hidden'); // Добавляем класс hidden к allLink
    textWidget.classList.add('show'); // Добавляем класс show к textWidget
    hideLink.classList.remove('hidden'); // Убираем класс hidden у hideLink
});

// Добавляем обработчик на клик по hideLink
hideLink.addEventListener('click', () => {
    allLink.classList.remove('hidden'); // Убираем класс hidden у allLink
    textWidget.classList.remove('show'); // Убираем класс show у textWidget
    hideLink.classList.add('hidden'); // Добавляем класс hidden к hideLink
});

/*- map -*/
ymaps.ready(init);

function init() {
    // Координаты для центра карты и маркера
    const centerCoords = [41.247013, 69.344647];

    // Создаём карту
    const myMap = new ymaps.Map("map", {
        center: centerCoords, // Центр карты совпадает с координатами маркера
        zoom: 15,
        controls: ['zoomControl'] // Оставляем только кнопки управления масштабом
    });

    // Отключаем прокрутку колёсиком и перемещение тачем
    myMap.behaviors.disable(['scrollZoom', 'drag', 'multiTouch']);

    // Добавляем кастомный маркер по центру
    const customPlacemark = new ymaps.Placemark(centerCoords, {
        hintContent: 'Gumbaz Строительный рынок',
        balloonContent: 'Gumbaz: Строительный рынок в Ташкенте'
    }, {
        // Опции для кастомного изображения
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/local.svg', // Путь к вашему изображению маркера
        iconImageSize: [60, 70], // Размер изображения
        iconImageOffset: [-30, -35] // Смещение изображения
    });

    // Добавляем маркер на карту
    myMap.geoObjects.add(customPlacemark);
}

/*- form-modal -*/
document.addEventListener("DOMContentLoaded", () => {
    // При клике на data-modal
    document.querySelectorAll("[data-modal]").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            // Если data-modal находится на ссылке (a href), предотвращаем переход по ссылке
            if (trigger.tagName.toLowerCase() === "a") {
                e.preventDefault();
            }

            const modalId = trigger.getAttribute("data-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                document.body.classList.add("scroll-none");
                modal.classList.add("show");
            }
        });
    });

    // Обработка закрытия модальных окон
    document.querySelectorAll(".form-modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("form-modal__close-btn") || 
                e.target.classList.contains("form-modal__overlay")
            ) {
                modal.classList.remove("show");
                document.body.classList.remove("scroll-none");
            }
        });
    });
});

/*- furniture-modal -*/
document.addEventListener("DOMContentLoaded", () => {
    // При клике на data-furniture-modal
    document.querySelectorAll("[data-furniture-modal]").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            // Если data-modal находится на ссылке (a href), предотвращаем переход по ссылке
            if (trigger.tagName.toLowerCase() === "a") {
                e.preventDefault();
            }

            const modalId = trigger.getAttribute("data-furniture-modal");
            const modal = document.getElementById(modalId);

            if (modal) {
                document.body.classList.add("scroll-none");
                modal.classList.add("show");
            }
        });
    });

    // Обработка закрытия модальных окон
    document.querySelectorAll(".furniture-modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("furniture-modal__close-btn") || 
                e.target.classList.contains("furniture-modal")
            ) {
                modal.classList.remove("show");
                document.body.classList.remove("scroll-none");
            }
        });
    });
});

/*- mobile-menu -*/
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close-btn');

    // Показать меню
    mobileMenuBtn.addEventListener('click', () => {
        body.classList.add('m-scroll-none');
        mobileMenu.classList.add('show');
    });

    // Скрыть меню
    mobileMenuCloseBtn.addEventListener('click', () => {
        body.classList.remove('m-scroll-none');
        mobileMenu.classList.remove('show');
    });
});
