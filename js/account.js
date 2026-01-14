// Хранение данных пользователя
let userData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: 'oldPassword123!' // Для демонстрации, в реальном приложении это должно быть хэшировано
};

// DOM элементы
const form = document.getElementById('profileForm');
const submitBtn = document.getElementById('submitBtn');
const notification = document.getElementById('notification');

// Регулярные выражения для валидации
const patterns = {
    name: /^[а-яА-ЯёЁa-zA-Z]{2,50}$/,
    phone: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Инициализация формы сохраненными данными
function initForm() {
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('email').value = userData.email;
}

// Показ уведомления
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Валидация имени или фамилии
function validateName(value, fieldName) {
    if (!value.trim()) return 'Это поле обязательно для заполнения';
    if (!patterns.name.test(value)) return 'Должно содержать 2-50 буквенных символов';
    return '';
}

// Валидация телефона
function validatePhone(value) {
    if (!value.trim()) return 'Это поле обязательно для заполнения';
    if (!patterns.phone.test(value)) return 'Введите корректный номер телефона';
    return '';
}

// Валидация email
function validateEmail(value) {
    if (!value.trim()) return 'Это поле обязательно для заполнения';
    if (!patterns.email.test(value)) return 'Введите корректный email адрес';
    return '';
}

// Проверка силы пароля
function checkPasswordStrength(password) {
    const strength = {
        weak: /^.{0,7}$/,
        medium: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$|^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        strong: patterns.password
    };

    if (strength.strong.test(password)) return 'strong';
    if (strength.medium.test(password)) return 'medium';
    return 'weak';
}

// Валидация пароля
function validatePassword(value, isOld = false) {
    if (!value.trim() && !isOld) return 'Это поле обязательно для заполнения';
    if (!isOld && !patterns.password.test(value)) return 'Пароль слишком слабый';
    return '';
}

// Валидация подтверждения пароля
function validateConfirmPassword(password, confirm) {
    if (password && password !== confirm) return 'Пароли не совпадают';
    return '';
}

// Проверка старого пароля
function validateOldPassword(value) {
    if (!value.trim()) return 'Введите старый пароль';
    if (value !== userData.password) return 'Старый пароль введен неверно';
    return '';
}

// Обновление индикатора силы пароля
function updatePasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthBar = document.getElementById('passwordStrength');

    if (!password) {
        strengthBar.className = 'password-strength';
        strengthBar.style.width = '0';
        return;
    }

    const strength = checkPasswordStrength(password);
    strengthBar.className = `password-strength ${strength}`;
}

// Отображение ошибки
function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    const inputElement = document.getElementById(inputId);

    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('invalid');
    inputElement.classList.remove('valid');
}

// Скрытие ошибки
function hideError(inputId) {
    const errorElement = document.getElementById(inputId + 'Error');
    const inputElement = document.getElementById(inputId);

    errorElement.style.display = 'none';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
}

// Валидация всего поля
function validateField(inputId, validator, ...args) {
    const value = document.getElementById(inputId).value;
    const error = validator(value, ...args);

    if (error) {
        showError(inputId, error);
        return false;
    } else {
        hideError(inputId);
        return true;
    }
}

// Основная функция валидации формы
function validateForm() {
    let isValid = true;

    // Валидация имени и фамилии
    isValid = validateField('firstName', validateName) && isValid;
    isValid = validateField('lastName', validateName) && isValid;

    // Валидация контактных данных
    isValid = validateField('phone', validatePhone) && isValid;
    isValid = validateField('email', validateEmail) && isValid;

    // Проверка, меняется ли пароль
    const newPassword = document.getElementById('newPassword').value;
    const oldPassword = document.getElementById('oldPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword || confirmPassword) {
        // Если введен новый пароль, проверяем старый и новый
        isValid = validateField('oldPassword', validateOldPassword) && isValid;
        isValid = validateField('newPassword', validatePassword) && isValid;
        isValid = validateField('confirmPassword', (value) =>
            validateConfirmPassword(newPassword, value)) && isValid;
    }

    return isValid;
}

// Сохранение данных
function saveData() {
    userData.firstName = document.getElementById('firstName').value.trim();
    userData.lastName = document.getElementById('lastName').value.trim();
    userData.phone = document.getElementById('phone').value.trim();
    userData.email = document.getElementById('email').value.trim();

    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        userData.password = newPassword;
        showNotification('Пароль успешно изменен!');
        // Очищаем поля паролей
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('passwordStrength').className = 'password-strength';
        document.getElementById('passwordStrength').style.width = '0';
    } else {
        showNotification('Данные успешно сохранены!');
    }

    // Сбрасываем валидацию
    ['firstName', 'lastName', 'phone', 'email', 'oldPassword', 'newPassword', 'confirmPassword']
        .forEach(id => {
            document.getElementById(id).classList.remove('valid', 'invalid');
            hideError(id);
        });
}

// Обработчики событий
function setupEventListeners() {
    // Валидация в реальном времени
    ['firstName', 'lastName', 'phone', 'email'].forEach(id => {
        document.getElementById(id).addEventListener('blur', () => {
            const validators = {
                firstName: validateName,
                lastName: validateName,
                phone: validatePhone,
                email: validateEmail
            };
            validateField(id, validators[id]);
        });
    });

    // Для паролей
    document.getElementById('oldPassword').addEventListener('blur', () => {
        validateField('oldPassword', validateOldPassword);
    });

    document.getElementById('newPassword').addEventListener('input', updatePasswordStrength);

    document.getElementById('newPassword').addEventListener('blur', () => {
        validateField('newPassword', validatePassword);
    });

    document.getElementById('confirmPassword').addEventListener('blur', () => {
        const newPassword = document.getElementById('newPassword').value;
        validateField('confirmPassword', (value) => validateConfirmPassword(newPassword, value));
    });

    // Отправка формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Сохранение...';

            // Имитация запроса к серверу
            setTimeout(() => {
                saveData();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Изменить';
            }, 1000);
        } else {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initForm();
    setupEventListeners();
});

    // Функция для переключения разделов
    function switchSection(section) {
    // Скрываем все разделы
    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.orders').style.display = 'none';
    document.querySelector('.address').style.display = 'none';

    // Показываем выбранный раздел
    document.querySelector(`.${section}`).style.display = 'block';

    // Удаляем активный класс у всех пунктов меню
    const menuItems = document.querySelectorAll('.aside-list li');
    menuItems.forEach(item => {
    item.classList.remove('aside-list__active');
});

    // Добавляем активный класс к выбранному пункту
    const menuItemsArray = Array.from(menuItems);
    let index;

    switch(section) {
    case 'profile':
    index = 0;
    break;
    case 'orders':
    index = 1;
    break;
    case 'address':
    index = 2;
    break;
    default:
    index = 0;
}

    if (index < menuItemsArray.length) {
    menuItemsArray[index].classList.add('aside-list__active');
}
}

    // Обработчики кликов на пункты меню
    document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.aside-list li');

    menuItems.forEach((item, index) => {
    item.addEventListener('click', function() {
    const sections = ['profile', 'orders', 'address'];

    // Если кликнули не на "Выход"
    if (index < 3) {
    switchSection(sections[index]);
} else {
    // Обработка выхода
    if (confirm('Вы уверены, что хотите выйти?')) {
    alert('Вы вышли из аккаунта');
    // Здесь можно добавить редирект или очистку данных
    // window.location.href = '../index.html';
}
}
});
});

    // По умолчанию показываем профиль
    switchSection('profile');
});

