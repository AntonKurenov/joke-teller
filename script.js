const explicitOptions = document.querySelector(".explicit-option");
const yesButton = document.querySelector('.button-yes');
const radioOptions = document.querySelector('.radio-group');
const enterButton = document.querySelector('.button-enter');
const jokeText = document.querySelector('.text');
const feedbackButtons = document.querySelector('.feedback');
const voteUpButton = document.querySelector('.vote--up');
const voteDownButton = document.querySelector('.vote--down');
const url = 'https://v2.jokeapi.dev/joke/any';
let isDark = true;

function radioButtonsHandler(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return;
	}
	if (target.value === 'radio-yes') {
		isDark = true;
	} else {
		isDark = false;
	}
	if (!enterButton.classList.contains('show')) {
		enterButton.classList.add('show');
	}
}

function placeJoke(data) {
	if (data.type === 'twopart') {
		let time = data.setup.split(' ').length * 190;
		console.log('time = ', time);
		jokeText.innerText = `${data.setup}\n.....`;
		setTimeout(() => jokeText.innerText = `${data.setup}\n${data.delivery}`, time);
	} else {
		jokeText.innerText = data.joke;
	}
	setTimeout(() => enterButton.innerText = 'Next joke >>', 700);
	setTimeout(() => feedbackButtons.classList.toggle('show'), 1300);
}

function placeError(error) {
	jokeText.innerText = `Sorry, an error occurred, please try again later.\n` +
		`More about that error in console.`;
	console.log(error);
}

function fetchJoke() {
	if (feedbackButtons.classList.contains('show')) {
		feedbackButtons.classList.toggle('show');
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
	if (event.target.tagName === 'BUTTON') {
		event.target.classList.toggle('pressed');
		return;
	}
	if (event.target.tagName === 'SPAN') {
		event.target.parentElement.classList.toggle('pressed');
		return;
	}
}

enterButton.addEventListener('click', fetchJoke);

radioOptions.addEventListener('click', radioButtonsHandler);

yesButton.addEventListener("click", (event) => {
	explicitOptions.style.display = 'flex';
	yesButton.style.backgroundColor = 'green';
})

feedbackButtons.addEventListener('click', feedbackHandler);
