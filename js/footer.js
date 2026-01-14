// Получаем все кнопки с классом .footer-back
const backToTopButtons = document.querySelectorAll('.footer-back');

// Обработчик клика для каждой кнопки
backToTopButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Если кнопка находится внутри ссылки

        // Плавная прокрутка к верху страницы
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Если нужно показывать/скрывать кнопки при прокрутке:
// window.addEventListener('scroll', () => {
//     const shouldShow = window.scrollY > 300;
//
//     backToTopButtons.forEach(button => {
//         button.style.display = shouldShow ? 'block' : 'none';
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const openSearchBtn = document.getElementById('openSearch');
    const closeSearchBtn = document.getElementById('closeSearch');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.querySelector('.search-modal__input');
    const searchBackdrop = document.querySelector('.search-modal__backdrop');

    // Функция открытия модального окна
    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.classList.add('no-scroll');

        // Фокус на поле ввода после небольшой задержки для анимации
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    // Функция закрытия модального окна
    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        searchInput.value = ''; // Очищаем поле поиска
    }

    // Открытие по клику на кнопку поиска
    openSearchBtn.addEventListener('click', openSearchModal);

    // Закрытие по клику на крестик
    closeSearchBtn.addEventListener('click', closeSearchModal);

    // Закрытие по клику на фон
    searchBackdrop.addEventListener('click', closeSearchModal);

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });

    // Предотвращаем закрытие при клике на контент модалки
    document.querySelector('.search-modal__content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Обработчик отправки формы поиска (опционально)
    document.querySelector('.search-modal__form').addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            console.log('Поиск:', query);
            // Здесь можно добавить логику поиска
        }
    });

    // Показываем/скрываем кнопку очистки в зависимости от содержимого
    searchInput.addEventListener('input', function() {
        if (searchInput.value.trim()) {
            closeSearchBtn.style.display = 'flex';
        } else {
            closeSearchBtn.style.display = 'none';
        }
    });

    // Изначально скрываем кнопку очистки
    closeSearchBtn.style.display = 'none';
});

document.querySelectorAll('.item-select').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});
