const explicitOptions = document.querySelector(".explicit-option");
const yesButton = document.querySelector('.button-yes');
const radioOptions = document.querySelector('.radio-group');
const enterButton = document.querySelector('.button-enter');
const jokeText = document.querySelector('.text');
const feedbackButtons = document.querySelector('.feedback-buttons');
const feedbackDiv = document.querySelector('.feedback')
const likeButton = document.querySelector('.vote--up');
const dislikeButton = document.querySelector('.vote--down');
const toFavoriteButton = document.querySelector('.fa-heart');
const url = 'https://v2.jokeapi.dev/joke/any';
let isDark = true;
let isPositivePressed = false;
let isNegativePressed = false;

function radioButtonsHandler(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return;
	}
	isDark = target.value === 'radio-yes';
	if (!enterButton.classList.contains('show')) {
		enterButton.classList.add('show');
	}
}

function placeJoke(data) {
	if (data.type === 'twopart') {
		let time = data.setup.split(' ').length * 190;
		jokeText.innerText = `${data.setup}\n.....`;
		setTimeout(() => jokeText.innerText = `${data.setup}\n${data.delivery}`, time);
	} else {
		jokeText.innerText = data.joke;
	}
	setTimeout(() => enterButton.innerText = 'Next joke >>', 700);
	setTimeout(() => feedbackDiv.classList.toggle('show'), 1300);
}

function placeError(error) {
	jokeText.innerText = `Sorry, an error occurred, please try again later.\n` +
		`More about that error in console.`;
	console.log(error);
}

function fetchJoke() {
	if (feedbackDiv.classList.contains('show')) {
		feedbackDiv.classList.toggle('show');
	}
	let addr = url;
	if (!isDark) {
		addr += '?safe-mode';
	}
	console.log('style = ', jokeText.style.display)
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

function feedbackHandler(event) {
	let ev = event.target;
	if (ev.tagName === 'BUTTON') {
		ev.classList.toggle('pressed');
		if (ev.value === 'like') {
			isPositivePressed = !isPositivePressed;
			if (isNegativePressed) {
				dislikeButton.classList.toggle('pressed');
				isNegativePressed = false;
			}
		}
		if (ev.value === 'dislike') {
			isNegativePressed = !isNegativePressed;
			if (isPositivePressed) {
				likeButton.classList.toggle('pressed');
				isPositivePressed = false;
			}
		}
	}
}

function addToFavoriteHandler(event) {
	console.log('favorite');
	let ev = event.target;
	toFavoriteButton.classList.toggle('fa-solid');
}

enterButton.addEventListener('click', fetchJoke);

radioOptions.addEventListener('click', radioButtonsHandler);

yesButton.addEventListener("click", (event) => {
	explicitOptions.style.display = 'flex';
	yesButton.style.backgroundColor = 'green';
})

feedbackButtons.addEventListener('click', feedbackHandler);

toFavoriteButton.addEventListener('click', addToFavoriteHandler);


// function showMessage() {
// 	if (cheeringPopup.classList.contains('show')) {
// 		return ;
// 	}
// 	let text = motivationPhrases[Math.floor(Math.random() * motivationPhrases.length)];
// 	cheeringPopup.innerText = text;
// 	// let elemWidth = cheeringPopup.offsetWidth;
// 	cheeringPopup.style.left = `${window.innerWidth / 2 - cheeringPopup.offsetWidth / 2}px`
// 	cheeringPopup.classList.toggle('show');
// 	setTimeout(() => cheeringPopup.classList.toggle('show'), 1500);
// }