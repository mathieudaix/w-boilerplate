import { el } from './utilities'

import gsap from 'gsap'

function menu() {
	const navTimeline = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.4, ease: 'expo.inOut' } })

	navTimeline
		.to(el('.nav .nav__icon span:first-of-type'), { rotate: -45, y: 3.5 }, 0)
		.to(el('.nav .nav__icon span:last-of-type'), { rotate: 45, y: -3.5 }, 0)
		.to(el('.nav .nav__menu'), { autoAlpha: 1 }, 0)

	el('.nav .nav__icon').addEventListener('click', () => {
		navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse()
	})
}

export { menu }