function Joke(config) {
	const params = config || {};
	this.isDark = params.isDark;
	this.url = params.url;
	if (!isDark) {
		this.url += '?safe-mode';
	}
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
}