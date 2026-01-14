const HEART_EMPTY = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.03 5.53094C4.95625 6.47844 3.4375 8.73344 3.4375 11.4222C3.4375 14.1684 4.5625 16.2859 6.1725 18.1009C7.50125 19.5959 9.10875 20.8359 10.6763 22.0434C11.0496 22.3309 11.4183 22.6176 11.7825 22.9034C12.44 23.4222 13.0263 23.8759 13.5925 24.2072C14.1588 24.5384 14.6125 24.6884 15 24.6884C15.3875 24.6884 15.8425 24.5384 16.4075 24.2072C16.9738 23.8759 17.56 23.4222 18.2175 22.9034C18.5817 22.6168 18.9504 22.3305 19.3238 22.0447C20.8913 20.8347 22.4988 19.5959 23.8275 18.1009C25.4388 16.2859 26.5625 14.1684 26.5625 11.4222C26.5625 8.73469 25.0438 6.47844 22.97 5.53094C20.955 4.60969 18.2475 4.85344 15.675 7.52719C15.5875 7.61792 15.4827 7.69009 15.3667 7.73939C15.2507 7.78868 15.126 7.81409 15 7.81409C14.874 7.81409 14.7493 7.78868 14.6333 7.73939C14.5173 7.69009 14.4125 7.61792 14.325 7.52719C11.7525 4.85344 9.045 4.60969 7.03 5.53094ZM15 5.57594C12.11 2.98844 8.87375 2.62594 6.25 3.82469C3.4825 5.09344 1.5625 8.03344 1.5625 11.4234C1.5625 14.7547 2.95 17.2972 4.77125 19.3472C6.22875 20.9884 8.0125 22.3622 9.58875 23.5747C9.94708 23.8497 10.2913 24.1172 10.6213 24.3772C11.2625 24.8822 11.95 25.4197 12.6463 25.8272C13.3425 26.2347 14.1375 26.5647 15 26.5647C15.8625 26.5647 16.6575 26.2334 17.3538 25.8272C18.0513 25.4197 18.7375 24.8822 19.3788 24.3772C19.7088 24.1172 20.0529 23.8497 20.4113 23.5747C21.9863 22.3622 23.7713 20.9872 25.2288 19.3472C27.05 17.2972 28.4375 14.7547 28.4375 11.4234C28.4375 8.03344 26.5188 5.09344 23.75 3.82719C21.1263 2.62719 17.89 2.98969 15 5.57594Z" fill="#DFDFDF" />
</svg>
`;

const HEART_FILLED = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 11.4208C2.5 17.4995 7.525 20.7382 11.2025 23.6382C12.5 24.6607 13.75 25.6245 15 25.6245C16.25 25.6245 17.5 24.662 18.7975 23.637C22.4762 20.7395 27.5 17.4995 27.5 11.422C27.5 5.3445 20.625 1.03075 15 6.87575C9.375 1.03075 2.5 5.342 2.5 11.4208Z"
fill="#E63232"/>
</svg>
`;

const FAVORITES_KEY = 'favorites';

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
    return getFavorites().some(item => item.id === id);
}

document.querySelectorAll('.item').forEach(item => {
    const id = item.dataset.id;
    const btn = item.querySelector('.js-favorite-btn');

    btn.innerHTML = isFavorite(id) ? HEART_FILLED : HEART_EMPTY;

    btn.addEventListener('click', () => toggleFavorite(item));
});

function toggleFavorite(item) {
    const id = item.dataset.id;
    let favorites = getFavorites();
    const index = favorites.findIndex(f => f.id === id);

    const btn = item.querySelector('.js-favorite-btn');

    if (index === -1) {
        // ДОБАВЛЕНИЕ
        favorites.push({
            id,
            name: item.querySelector('.item-name')?.innerText || '',
            price: item.querySelector('.item-price')?.innerText || '',
            img: item.querySelector('.item-img')?.src || ''
        });

        btn.innerHTML = HEART_FILLED;
        showToast('Товар добавлен в избранное ❤️');

    } else {
        // УДАЛЕНИЕ
        favorites.splice(index, 1);
        saveFavorites(favorites);

        btn.innerHTML = HEART_EMPTY;
        showToast('Товар удалён из избранного');

        // 🟢 ЕСЛИ МЫ НА СТРАНИЦЕ ИЗБРАННОГО — УДАЛЯЕМ КАРТОЧКУ
        if (item.closest('#favorites-list')) {
            item.remove();

            // если избранное пустое
            if (!favorites.length) {
                const empty = document.getElementById('favorites-empty');
                if (empty) empty.style.display = 'block';
            }

        }

        return;
    }

    saveFavorites(favorites);
}

function showToast(text) {
    const toast = document.getElementById('toast');
    toast.textContent = text;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

const list = document.getElementById('favorites-list');
const empty = document.getElementById('favorites-empty');

if (list) {
    const favorites = getFavorites();

    if (!favorites.length) {
        empty.style.display = 'block';
    } else {
        list.innerHTML = favorites.map(item => `
            <li class="item" data-id="${item.id}">
                <div class="item-wrapper">
                  <span class="item-category">new</span>
                    <button class="item-select js-favorite-btn">
                        ${HEART_FILLED}
                    </button>
                </div>
                <img class="item-img" src="${item.img}">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price}</span>
            </li>
        `).join('');
    }
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-favorite-btn');
    if (!btn) return;

    const item = btn.closest('.item');
    if (!item) return;

    toggleFavorite(item);
});

