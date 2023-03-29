const enterButton = document.querySelector('.button-enter');
const jokeText = document.querySelector('.text');
const feedbackDiv = document.querySelector('.feedback')
const likeButton = document.querySelector('.vote--up');
const dislikeButton = document.querySelector('.vote--down');
const toFavoriteButton = document.querySelector('.fa-star');
const favoritesListButton = document.querySelector('.favorites-button');
const favoritesCloseListButton = document.querySelector('.favorites-button__list');
const content = document.querySelector('.content');
const favoritesContent = document.querySelector('.favorites-content');
const favoritesList = document.querySelector('.favorites-list');

const tooltipIcon = document.querySelector('.fa-question');
const tooltipText = document.querySelector('.tooltip-text');

const url = 'https://v2.jokeapi.dev/joke/any';
let isDark = true;
let currentJoke;

let favorites = [];

// let jokeObj = {
// 	id: '123',
// 	text: 'Hello world!',
//  isSafe: false,
// 	isLiked: true,
// 	isDisliked: false,
// };

function radioButtonsHandler(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return;
	}
	currentJoke.isDark = target.value === 'radio-yes';
	if (!enterButton.classList.contains('show')) {
		enterButton.classList.add('show');
	}
}

function placeJoke(joke) {
	// jokeText.dataset.id = data.id;
	// jokeText.dataset.safe = data.safe;
	// jokeText.dataset.text = data.joke;
	if (joke.type === 'twopart') {
		currentJoke.text = `${joke.setup}\n${joke.delivery}`;
		let time = joke.setup.split(' ').length * 190;
		jokeText.innerText = `${joke.setup}\n.....`;
		setTimeout(() => jokeText.innerText = `${joke.setup}\n${joke.delivery}`, time);
		setTimeout(() => feedbackDiv.classList.toggle('show'), time + 800);
	} else {
		jokeText.innerText = joke.joke;
		currentJoke.text = joke.joke;
		setTimeout(() => feedbackDiv.classList.toggle('show'), 1300);
	}
	currentJoke.id = joke.id;
	currentJoke.isSafe = joke.safe;
	setTimeout(() => enterButton.innerText = 'Next joke >>', 700);
	if (isInFavorites(currentJoke)) {
		toFavoriteButton.classList.remove('fa-regular');
		toFavoriteButton.classList.add('fa-solid');
	} else {
		toFavoriteButton.classList.remove('fa-solid');
		toFavoriteButton.classList.add('fa-regular');
	}
}

function placeError(error) {
	jokeText.innerText = `Sorry, an error occurred, please try again later.\n` +
		`More about that error in console.`;
	console.log(error);
}

function controlFlow() {
	currentJoke = new Joke();
	fetchJoke();
	joke.text = jokeText.innerText;
}

function fetchJoke() {
	if (feedbackDiv.classList.contains('show')) {
		feedbackDiv.classList.toggle('show');
	}
	let addr = url;
	currentJoke = {};
	if (!isDark) {
		addr += '?safe-mode';
	}
	if (!jokeText.classList.contains('show')) {
		jokeText.classList.add('show');
	}
	jokeText.innerText = 'Your joke is loading...';
	fetch(addr)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error occured!');
			}
			return response.json();
		})
		.then((data) => placeJoke(data))
		.catch((error) => placeError(error));
}

function addJokeToFavoriteList(jokeObj) {
	let jokeElem = document.createElement('div');
	let icon = document.createElement('i');
	icon.classList.add('fa-star', 'fa-solid');
	jokeElem.innerText = jokeObj.text;
	jokeElem.dataset.id = jokeObj.id;
	jokeElem.classList.add('favorites-element');
	jokeElem.appendChild(icon);
	favoritesList.appendChild(jokeElem);
}

function addToFavoriteHandler(event) {
	console.log('favorite');
	let ev = event.target;
	if (toFavoriteButton.classList.contains('fa-regular')) {
		toFavoriteButton.classList.add('fa-solid');
		toFavoriteButton.classList.remove('fa-regular');
		if (isInFavorites(currentJoke)) {
			return;
		}
		favorites.push(currentJoke);
		addJokeToFavoriteList(currentJoke);
		showMessage('Joke added to Favorites!');
	} else {
		toFavoriteButton.classList.add('fa-regular');
		toFavoriteButton.classList.remove('fa-solid');
		favorites.pop();
		if (isInFavorites(currentJoke)) {
			favoritesList.children[0].remove();
			showMessage('Joke removed from Favorites!');
		}
	}
}

function showFavorites(event) {
	content.style.display = 'none';
	favoritesContent.style.display = 'flex';
	favoritesListButton.style.display = 'none';
}

function closeFavorites(event) {
	content.style.display = 'flex';
	favoritesContent.style.display = 'none';
	favoritesListButton.style.display = 'block';
}

function favoritesListClickHandle(event) {
	let target = event.target;
	if (target.tagName === 'I') {
		let jokeId = target.parentElement.dataset.id;
		removeFromFavorites(jokeId);
		target.parentElement.remove();
		showMessage('Joke removed from Favorites!');
	}
}

toFavoriteButton.addEventListener('click', addToFavoriteHandler);
favoritesListButton.addEventListener('click', showFavorites);
favoritesCloseListButton.addEventListener('click', closeFavorites);
favoritesContent.addEventListener('click', favoritesListClickHandle);

// actions on page load:
document.addEventListener('DOMContentLoaded', () => {
	currentJoke = new Joke({
		url: url,
		isDark: isDark
	});
	if (JSON.parse(localStorage.getItem('favorites'))) {
		favorites = JSON.parse(localStorage.getItem('favorites'));
	}
	favorites.forEach((elem) => addJokeToFavoriteList(elem));
})

tooltipIcon.addEventListener('mouseover', () => {
	tooltipText.style.display = 'flex';
})

tooltipIcon.addEventListener('mouseleave', () => {
	tooltipText.style.display = 'none';
})