const explicitOptions = document.querySelector(".explicit-option");
const yesButton = document.querySelector('.button-yes');
const radioOptions = document.querySelector('.radio-group');
const enterButton = document.querySelector('.button-enter');
const jokeText = document.querySelector('.text');
const url = 'https://v2.jokeapi.dev/joke/any';
let isDark = true;

function radioButtonsHandler(event) {
	// console.log('hellr')
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return;
	}
	if (target.value === 'radio-yes') {
		isDark = true;
	} else {
		isDark = false;
	}
	console.log(enterButton.classList);
	if (!enterButton.classList.contains('show')) {
		enterButton.classList.add('show');
		// console.log(enterButton.className);
	}
	// fetchJoke();
}

function placeJoke(data) {
	// jokeText.style.display = 'block';
	if (data.type === 'twopart') {
		console.log('data.setup = ', data.setup.split());
		let time = data.setup.split(' ').length * 260;
		console.log('time = ', time);
		jokeText.innerText = `${data.setup}\n.....`;
		setTimeout(() => jokeText.innerText = `${data.setup}\n${data.delivery}`, time);
	} else {
		jokeText.innerText = data.joke;
	}
}

function fetchJoke() {
	let addr = url;
	if (!isDark) {
		addr += '?safe-mode';
	}
	console.log('style = ', jokeText.style.display)
	if (!jokeText.classList.contains('show')) {
		console.log('hhhh');
		jokeText.classList.add('show');
	}
	jokeText.innerText = 'Your joke is loading...';
	fetch(addr)
		.then((response) => response.json())
		.then((data) => placeJoke(data))
		.catch((error) => console.log(error));

}

enterButton.addEventListener('click', fetchJoke);

radioOptions.addEventListener('click', radioButtonsHandler);

yesButton.addEventListener("click", (event) => {
	explicitOptions.style.display = 'flex';
	yesButton.style.backgroundColor = 'green';
})
