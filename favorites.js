console.log('test here');

function isInFavorites(joke) {
	for (const arrJoke of favorites) {
		if (arrJoke.id === joke.id) {
			return true;
		}
	}
	return false;
}
