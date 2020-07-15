import '../styles/index.scss'
import { el, els } from './utilities'

import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'
import gsap from 'gsap'

document.addEventListener('DOMContentLoaded', () => {

	const scroll = new LocomotiveScroll({
		el: el('[data-scroll-container]'),
		smooth: true,
		getSpeed: true,
		getDirection: true
	})

	const navTimeline = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.4, ease: 'expo.inOut' } })

	navTimeline
		.to(el('.nav .nav__icon span:first-of-type'), { rotate: -45, y: 3.5 }, 0)
		.to(el('.nav .nav__icon span:last-of-type'), { rotate: 45, y: -3.5 }, 0)
		.to(el('.nav .nav__menu'), { autoAlpha: 1 }, 0)

	el('.nav .nav__icon').addEventListener('click', () => {
		navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse()
	})

	const pageTransition = el('.page__transition')
	const pageTransitionPane = els('.page__transition__pane')

	barba.init({
		transitions: [{
			name: 'default-transition',
			beforeLeave() {
				const pageTransitionTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.inOut' } })
				return pageTransitionTimeline
					.to(pageTransition, { autoAlpha: 1, duration: 0.1 }, 0)
					.to(pageTransitionPane, { scaleY: 1, stagger: 0.1 }, 0)
			},
			leave() {
				return scroll.destroy()
			},
			beforeEnter() {
				navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse()
				const pageTransitionTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.inOut' } })
				pageTransitionTimeline
					.to(pageTransitionPane, { scaleY: 0, stagger: 0.1 }, 0.5)
					.to(pageTransition, { autoAlpha: 0, duration: 0.1 }, 1.3)
			},
			enter() {
				return scroll.init()
			},
			after() {
				return scroll.update()
			}
		}]
	})

})