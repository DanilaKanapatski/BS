// Получаем элементы
const basketButton = document.querySelector('.basket');
const basketOverlay = document.getElementById('basketOverlay');
const basketModal = document.getElementById('basketModal');
const closeBasketButton = document.getElementById('closeBasket');

// Функция открытия корзины
function openBasket() {
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    basketOverlay.classList.add('active');
}

// Функция закрытия корзины
function closeBasket() {
    document.body.style.overflow = ''; // Восстанавливаем скролл страницы
    basketOverlay.classList.remove('active');
}

// Открытие корзины по клику на иконку
basketButton.addEventListener('click', (e) => {
    e.stopPropagation();
    openBasket();
});

// Закрытие корзины по клику на крестик
closeBasketButton.addEventListener('click', closeBasket);

// Закрытие корзины по клику на оверлей (вне модального окна)
basketOverlay.addEventListener('click', (e) => {
    if (e.target === basketOverlay) {
        closeBasket();
    }
});

// Закрытие корзины по нажатию Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && basketOverlay.classList.contains('active')) {
        closeBasket();
    }
});

// Предотвращаем закрытие при клике внутри модального окна
basketModal.addEventListener('click', (e) => {
    e.stopPropagation();
});