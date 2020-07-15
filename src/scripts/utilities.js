function el(selector) {
	return document.querySelector(selector);
}

function els(selector) {
	return document.querySelectorAll(selector);
}

export { el, els }