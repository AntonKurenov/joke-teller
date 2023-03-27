function Joke(config) {
	const params = config || {};
	this.url = params.url;
	this.isDark = params.isDark;
	this.text = '';
	this.isFavorite = false;
	this.twopart = false;
	this.setup = '';
	this.delivery = '';

	this.changeFavoriteStatus = function() {
		this.isFavorite = !this.isFavorite;
	}

	this.writeData = function(data) {
		if (data.type === 'twopart') {
			this.twopart = true;
			this.setup = data.setup;
			this.delivery = data.delivery;
		} else {
			this.text = data.joke;
		}
		this.id = data.id;
	}

	this.fetchData = function() {
		let addr = url;
		// if (!isDark)
	}
}

function fetchJoke2(joke) {
	let addr = url;
	if (!isDark) {
		addr += '?safe-mode';
		joke.isDark = false;
	}
	jokeText.innerText = 'Your joke is loading...';
	fetch(addr)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error occured!');
			}
			return response.json();
		})
		.then((data) => {
			joke.writeData(data);
			placeJoke(joke);
		})
		.catch((error) => placeError(error));
}