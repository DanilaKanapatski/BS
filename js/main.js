document.addEventListener('DOMContentLoaded', function() {
    const brandLinks = document.querySelectorAll('.brands-list a');
    const brandPreview = document.getElementById('brandPreview');
    const previewImage = brandPreview.querySelector('img');

    // Карта соответствия брендов и их изображений
    const brandImages = {
        'nike': '../assets/images/jordan.png',
        'jordan': '../assets/images/jordan.png',
        'adidas': '../assets/images/jordan.png',
        'puma': '../assets/images/jordan.png',
        'saucony': '../assets/images/jordan.png',
        'the north face': '../assets/images/jordan.png'
    };

    // Переменная для отслеживания активного бренда
    let activeBrand = null;

    // Обработчик движения мыши для следования за курсором
    function updatePreviewPosition(e) {
        if (!activeBrand) return;

        brandPreview.style.left = e.clientX + 'px';
        brandPreview.style.top = (e.clientY + 50) + 'px'; // Немного выше курсора
    }

    // Добавляем обработчики для каждой ссылки
    brandLinks.forEach(link => {
        const brandText = link.textContent.toLowerCase().trim();

        link.addEventListener('mouseenter', function(e) {
            const imageName = brandImages[brandText];
            if (imageName) {
                activeBrand = brandText;
                previewImage.src = imageName;
                previewImage.alt = brandText + ' logo';
                brandPreview.style.display = 'block';

                // Позиционируем превью сразу при наведении
                updatePreviewPosition(e);

                // Начинаем отслеживать движение мыши
                document.addEventListener('mousemove', updatePreviewPosition);
            }
        });

        link.addEventListener('mouseleave', function() {
            activeBrand = null;
            brandPreview.style.display = 'none';

            // Убираем обработчик движения мыши
            document.removeEventListener('mousemove', updatePreviewPosition);
        });

        // Также обрабатываем движение внутри ссылки
        link.addEventListener('mousemove', function(e) {
            if (activeBrand === brandText) {
                updatePreviewPosition(e);
            }
        });
    });

    // Обработчик для всего документа на случай быстрого перемещения мыши
    document.addEventListener('mousemove', function(e) {
        if (!activeBrand) return;

        // Проверяем, находится ли курсор над любой из ссылок
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        const isOverLink = hoveredElement && (
            hoveredElement.tagName === 'A' ||
            hoveredElement.closest('.brands-list a')
        );

        if (!isOverLink) {
            activeBrand = null;
            brandPreview.style.display = 'none';
            document.removeEventListener('mousemove', updatePreviewPosition);
        }
    });

    // Предзагрузка изображений для плавного отображения
    function preloadImages() {
        Object.values(brandImages).forEach(imagePath => {
            const img = new Image();
            img.src = imagePath;
        });
    }

    // Запускаем предзагрузку
    preloadImages();
});