// Получаем кнопку
const backToTopButton = document.querySelector('.footer-back');

// Показываем/скрываем кнопку при прокрутке
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Обработчик клика
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault(); // Если кнопка находится внутри ссылки

    // Плавная прокрутка к верху страницы
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Альтернативный вариант с requestAnimationFrame для большей плавности
    // smoothScrollToTop();
});