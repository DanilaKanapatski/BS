document.addEventListener('DOMContentLoaded', function() {
    // Получаем все радиокнопки
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const pickupButtonContainer = document.getElementById('pickupButtonContainer');
    const expressFormContainer = document.getElementById('expressFormContainer');

    // Функция для переключения отображения
    function toggleDeliveryOption() {
        const selectedValue = document.querySelector('input[name="delivery"]:checked').value;

        if (selectedValue === 'pickup') {
            // Показываем кнопку, скрываем форму
            pickupButtonContainer.style.display = 'block';
            expressFormContainer.style.display = 'none';
        } else if (selectedValue === 'express') {
            // Показываем форму, скрываем кнопку
            pickupButtonContainer.style.display = 'none';
            expressFormContainer.style.display = 'block';
        }
    }

    // Добавляем обработчики на все радиокнопки
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', toggleDeliveryOption);
    });

    // Инициализируем начальное состояние
    toggleDeliveryOption();

    // Обработчик для кнопки "Выбрать пункт самовывоза"
    const pickupButton = document.querySelector('.delivery');
    if (pickupButton) {
        pickupButton.addEventListener('click', function() {
            // Здесь можно добавить логику для выбора пункта самовывоза
            console.log('Открыть карту/список пунктов самовывоза CDEK');
            alert('Здесь будет открыта карта с пунктами самовывоза CDEK');
        });
    }
});