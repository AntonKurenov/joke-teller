const feedbackButtons = document.querySelector('.feedback-buttons');
const feedbackDiv = document.querySelector('.feedback')
const likeButton = document.querySelector('.vote--up');
const dislikeButton = document.querySelector('.vote--down');
let isPositivePressed = false;

let isNegativePressed = false;

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

feedbackButtons.addEventListener('click', feedbackHandler);