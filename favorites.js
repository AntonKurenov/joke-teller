console.log('test here');

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

function refreshFavoritesInLS() {
	localStorage.setItem('favorites', JSON.stringify(favorites));
}
