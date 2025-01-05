/*- offers-slider -*/
var swiper = new Swiper(".offers-slider", {
    autoplay: false,
    autoHeight: true,
    loop: false,
	slidesPerView: 3,
	slidesPerGroup: 3,
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
        slidesPerGroup: 3,
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
	slidesPerGroup: 4,
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
        slidesPerGroup: 4,
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

// Проверяем, существуют ли элементы на странице
if (allLink && hideLink && textWidget) {
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
}

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
            const modalIn = modal.querySelector(".form-modal__in");

            // Закрытие при клике на кнопке закрытия или на оверлее
            if (
                e.target.classList.contains("form-modal__close-btn") || 
                e.target.classList.contains("form-modal__overlay") || 
                (modalIn && !modalIn.contains(e.target)) // Клик вне form-modal__in
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
            // Если data-furniture-modal находится на ссылке (a href), предотвращаем переход по ссылке
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
            const modalIn = modal.querySelector(".furniture-modal__in");

            // Закрытие при клике на кнопке закрытия, оверлее или вне furniture-modal__in
            if (
                e.target.classList.contains("furniture-modal__close-btn") || 
                e.target.classList.contains("furniture-modal") || 
                (modalIn && !modalIn.contains(e.target)) // Клик вне furniture-modal__in
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

/*- select -*/
const selects = document.querySelectorAll('.select');
const inputs = document.querySelectorAll('.select-hidden-form input'); // Получаем все input

// Функция для закрытия всех open/show классов
function closeAllSelects(exceptSelect) {
    selects.forEach(select => {
        if (select !== exceptSelect) {
            const selectText = select.querySelector('.select__text');
            const selectDropdown = select.querySelector('.select__dropdown');
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
}

// Функция для переноса данных из select__text в input
function syncSelectWithInput() {
    selects.forEach((select, index) => {
        const input = inputs[index]; // Соответствующий input
        const selectText = select.querySelector('.select__text');

        // Перенос текста в input
        if (input && selectText) {
            input.value = selectText.textContent;
        }
    });
}

// Обрабатываем каждый select
selects.forEach(select => {
    const selectText = select.querySelector('.select__text');
    const selectDropdown = select.querySelector('.select__dropdown');
    const listItems = select.querySelectorAll('.select__dropdown li');

    // Функция для переключения классов на .select и .select__dropdown
    selectText.addEventListener('click', (event) => {
        event.stopPropagation(); // Останавливаем всплытие, чтобы клик по select не закрывал его

        // Если меню открыто, закрываем его, если нет — открываем
        const isOpen = select.classList.contains('open');
        closeAllSelects(select); // Закрываем все другие select
        if (!isOpen) {
            select.classList.add('open'); // Добавляем класс open к select
            selectText.classList.add('open');
            selectDropdown.classList.add('show');
        } else {
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });

    // Функция для обновления текста и класса active на <li>
    listItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // Останавливаем всплытие, чтобы клик по <li> не закрывал select

            // Убираем класс active со всех элементов <li>
            listItems.forEach(li => li.classList.remove('active'));

            // Добавляем класс active к текущему выбранному элементу
            item.classList.add('active');

            // Обновляем текст в .select__text
            selectText.textContent = item.textContent;

            // Перенос данных в input
            syncSelectWithInput();

            // Закрываем выпадающее меню
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        });
    });

    // Закрытие меню при клике на любую область страницы, кроме текущего select
    document.addEventListener('click', (event) => {
        if (!select.contains(event.target)) {
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
});

// Инициализируем начальные значения input
syncSelectWithInput();

/*- catalog -*/
document.addEventListener("DOMContentLoaded", () => {
    const catalog = document.getElementById("catalog");
    const catalogBtn = document.getElementById("catalog-btn");

    // Проверяем, существуют ли элементы с указанными id
    if (!catalog || !catalogBtn) {
        return; // Выходим из функции, если одного из блоков нет
    }

    const items = catalog.querySelectorAll(".furniture__item");

    const desktopVisibleCount = 16; // Количество элементов, которые изначально видны на десктопе
    const desktopLoadMoreCount = 4; // Количество элементов, которые показываются на десктопе при каждом клике
    const mobileVisibleCount = 4; // Количество элементов, которые изначально видны на мобильной версии
    const mobileLoadMoreCount = 4; // Количество элементов, которые показываются на мобильной версии при каждом клике

    const isMobile = () => window.innerWidth <= 767;

    // Функция для скрытия/показа элементов в зависимости от устройства
    const initializeItems = () => {
        const visibleCount = isMobile() ? mobileVisibleCount : desktopVisibleCount;

        items.forEach((item, index) => {
            if (index >= visibleCount) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
        });

        // Скрываем кнопку, если элементов меньше или равно видимому количеству
        if (items.length <= visibleCount) {
            catalogBtn.classList.add("hidden");
        } else {
            catalogBtn.classList.remove("hidden");
        }
    };

    // Функция для обработки кликов на кнопку
    const handleButtonClick = () => {
        const loadMoreCount = isMobile() ? mobileLoadMoreCount : desktopLoadMoreCount;
        let hiddenItems = Array.from(items).filter(item => item.classList.contains("hidden"));

        // Показываем следующую партию
        hiddenItems.slice(0, loadMoreCount).forEach(item => {
            item.classList.remove("hidden");
        });

        // Проверяем, если больше скрытых элементов нет, скрываем кнопку
        if (hiddenItems.length <= loadMoreCount) {
            catalogBtn.classList.add("hidden");
        }
    };

    // Инициализация элементов при загрузке страницы
    initializeItems();

    // Добавляем обработчик клика по кнопке
    catalogBtn.addEventListener("click", handleButtonClick);

    // Добавляем обработчик для изменения размера окна
    window.addEventListener("resize", () => {
        initializeItems();
    });
});

/*- furniture-slider -*/
var swiper = new Swiper(".furniture-slider__small", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
});

var swiper2 = new Swiper(".furniture-slider__big", {
    loop: false,
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
});

/*- related-slider -*/
var swiper = new Swiper(".related-slider .furniture", {
    autoplay: false,
    autoHeight: true,
    loop: false,
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: false,
    pagination: {
        el: ".related-slider .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".related-slider .swiper-button-next",
        prevEl: ".related-slider .swiper-button-prev",
    },
    breakpoints: {
    0: {
        slidesPerView: "auto",
        slidesPerGroup: true,
        spaceBetween: false,
        },
    768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: false,
        },
    },
});

/*- share -*/
document.addEventListener("DOMContentLoaded", () => {
    const icon = document.querySelector(".share__icon");
    const dropdown = document.querySelector(".share__dropdown");

    // Проверяем, что оба элемента существуют на странице
    if (icon && dropdown) {
        // Функция для переключения класса show
        function toggleDropdown(event) {
            event.stopPropagation(); // Останавливаем всплытие события, чтобы клик на иконке не закрывал меню
            dropdown.classList.toggle("show");
        }

        // Функция для закрытия dropdown при клике вне панели
        function closeDropdown(event) {
            if (!dropdown.contains(event.target) && !icon.contains(event.target)) {
                dropdown.classList.remove("show");
            }
        }

        // Добавляем обработчики событий
        icon.addEventListener("click", toggleDropdown);
        document.addEventListener("click", closeDropdown);
    }
});

/*- fancybox -*/
Fancybox.bind("[data-fancybox='gallery']", {
    Thumbs: {
        autoStart: true, // Автоматически отображать превью
    },
    Toolbar: {
        display: ["zoom", "close"], // Настройка панели инструментов
    },
});

/*- name-field -*/
document.addEventListener("DOMContentLoaded", () => {
    const nameFields = document.querySelectorAll(".name-field");

    if (nameFields.length > 0) {
        nameFields.forEach((nameField) => {
            nameField.addEventListener("input", (event) => {
                // Удаляем все символы, которые не являются буквами
                nameField.value = nameField.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
            });
        });
    } else {
        console.info("Элементы .name-field отсутствуют на странице.");
    }
});

