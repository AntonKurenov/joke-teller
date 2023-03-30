const jokeText = document.querySelector('.joke-text');
const toFavoriteButton = document.querySelector('.fa-star');
const favoritesListButton = document.querySelector('.favorites-button');
const favoritesCloseListButton = document.querySelector('.favorites-button__list');
const content = document.querySelector('.content');
const favoritesContent = document.querySelector('.favorites-content');
const favoritesList = document.querySelector('.favorites-list');
const getJokeButtons = document.querySelector('.options');

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

function placeJoke(joke) {
	if (joke.twopart) {
		currentJoke.text = `${joke.setup}\n${joke.delivery}`;
		let time = joke.setup.split(' ').length * 190;
		jokeText.innerText = `${joke.setup}\n.....`;
		setTimeout(() => jokeText.innerText = `${joke.setup}\n${joke.delivery}`, time);
	} else {
		jokeText.innerText = joke.text;
	}
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

function controlFlow(event) {
	if (event.target.tagName !== 'BUTTON') {
		return ;
	}
	if (event.target.classList.contains('safe-option')) {
		currentJoke = new Joke({isDark: false,
		url: url});
	} else {
		currentJoke = new Joke({isDark: true, url: url});
	}
	jokeText.innerText = 'Your joke is loading...';
	fetchJoke(currentJoke);
	// placeJoke(currentJoke);
}

function fetchJoke(joke) {
	fetch(joke.url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Error occured!');
			}
			return response.json();
		})
		.then((data) => {
			joke.writeData(data);
		})
		.then(() => placeJoke(joke))
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
	if (JSON.parse(localStorage.getItem('favorites'))) {
		favorites = JSON.parse(localStorage.getItem('favorites'));
	}
	favorites.forEach((elem) => addJokeToFavoriteList(elem));
})

getJokeButtons.addEventListener('click', controlFlow);

tooltipIcon.addEventListener('mouseover', () => {
	tooltipText.style.display = 'flex';
})

tooltipIcon.addEventListener('mouseleave', () => {
	tooltipText.style.display = 'none';
})