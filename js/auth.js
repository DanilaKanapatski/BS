const overlay = document.getElementById('authOverlay');
const body = document.body;

// Открыть
document.querySelector('.js-auth-open').addEventListener('click', () => {
    overlay.classList.add('is-active');
    body.style.overflow = 'hidden';
});

// Закрыть
document.querySelector('.js-auth-close').addEventListener('click', closeAuth);
overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAuth();
});

function closeAuth() {
    overlay.classList.remove('is-active');
    body.style.overflow = '';
}

// Переключение шагов
function showStep(name) {
    document.querySelectorAll('.auth-step').forEach(step => {
        step.classList.toggle('is-active', step.dataset.step === name);
    });
}

document.querySelector('.js-go-email').onclick = () => showStep('email-login');
document.querySelectorAll('.js-go-phone').forEach(btn =>
    btn.onclick = () => showStep('phone-login')
);
document.querySelector('.js-go-register').onclick = () => showStep('register');

function isValidPhone(phone) {
    return /^\+7\d{10}$/.test(phone.replace(/\D/g, '').replace(/^7/, '+7'));
}

function loginSuccess(text) {
    closeAuth();
    showToast(text);
    localStorage.setItem('auth', 'true');
}

document.querySelector('.js-login-phone').onclick = () => {
    const phone = document.querySelector('.js-phone').value;
    if (!isValidPhone(phone)) {
        showToast('Введите корректный номер');
        return;
    }
    loginSuccess('Вы вошли в аккаунт');
};

document.querySelector('.js-login-email').onclick = () => {
    const email = document.querySelector('.js-email').value;
    if (!email.includes('@')) {
        showToast('Введите корректный email');
        return;
    }
    loginSuccess('Вы вошли в аккаунт');
};

document.querySelector('.js-register').onclick = () => {
    loginSuccess('Вы успешно зарегистрировались');
};
