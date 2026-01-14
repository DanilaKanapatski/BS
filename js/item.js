document.addEventListener('DOMContentLoaded', function() {
    // Элементы для списка размеров
    const sizeHeader = document.getElementById('sizeHeader');
    const sizeArrow = document.getElementById('sizeArrow');
    const sizeList = document.getElementById('sizeList');

    // Элементы для счетчика
    const counterElement = document.getElementById('counter');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');

    // Переменная состояния для списка размеров
    let isSizeListVisible = false;

    // Переменная для счетчика
    let counter = 1;

    // Обработчик клика на заголовок "Размер"
    sizeHeader.addEventListener('click', function() {
        if (isSizeListVisible) {
            // Скрываем список
            sizeList.style.display = 'none';
            // Поворачиваем стрелку вниз
            sizeArrow.style.transform = 'rotate(0deg)';
        } else {
            // Показываем список
            sizeList.style.display = 'flex';
            // Поворачиваем стрелку вверх
            sizeArrow.style.transform = 'rotate(180deg)';
        }
        isSizeListVisible = !isSizeListVisible;
    });

    // Обработчики для счетчика
    decreaseBtn.addEventListener('click', function() {
        if (counter > 1) {
            counter--;
            counterElement.textContent = counter;
            // Можно добавить дополнительную логику здесь
        }
    });

    increaseBtn.addEventListener('click', function() {
        counter++;
        counterElement.textContent = counter;
        // Можно добавить дополнительную логику здесь
    });

    // Обработчик клика на элементы списка размеров (опционально)
    sizeList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI' || e.target.parentElement.tagName === 'LI') {
            const selectedSize = e.target.querySelector('span')?.textContent ||
                e.target.textContent.split('₽')[0].trim();

            // Можно выделить выбранный размер
            document.querySelectorAll('.size-list li').forEach(item => {
                item.classList.remove('selected');
            });

            const liElement = e.target.closest('li');
            if (liElement) {
                liElement.classList.add('selected');
            }

            // Можно обновить заголовок с выбранным размером
            // sizeHeader.querySelector('span').textContent = selectedSize;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const openModalBtn = document.querySelector('.product-table');
    const modalOverlay = document.getElementById('sizeModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Функция открытия модального окна
    function openModal() {
        modalOverlay.classList.add('active');
        // Блокируем скролл на body
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        // Восстанавливаем скролл
        document.body.style.overflow = '';
    }

    // Обработчики событий
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Закрытие по клику на overlay (экран вне модального окна)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});