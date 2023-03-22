// console.log('test here');
const cheeringPopup = document.querySelector('.window-message');

function isInFavorites(joke) {
	for (const arrJoke of favorites) {
		if (arrJoke.id === joke.id) {
			return true;
		}
	}
	return false;
}

function removeFromFavorites(jokeId) {
	let favoritesTmp = [];
	for (const joke of favorites) {
		if (joke.id === jokeId) {
			continue;
		}
		favoritesTmp.push(joke);
	}
	favorites = favoritesTmp;
}

function showMessage(message) {
	if (cheeringPopup.classList.contains('show')) {
		return;
	}
	cheeringPopup.innerText = message;
	cheeringPopup.style.left = `${window.innerWidth / 2 - cheeringPopup.offsetWidth / 2}px`
	cheeringPopup.classList.toggle('show');
	setTimeout(() => cheeringPopup.classList.toggle('show'), 1500);
}

function refreshFavoritesInLS() {
	localStorage.setItem('favorites', JSON.stringify(favorites));
}
