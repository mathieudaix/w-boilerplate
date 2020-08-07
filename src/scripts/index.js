import '../styles/index.scss'
import { el, els } from './utilities'

import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'

document.addEventListener('DOMContentLoaded', () => {

	setTimeout(() => {

		//  smooth scroll
		const scroll = new LocomotiveScroll({
			el: el('[data-scroll-container]'),
			smooth: true,
			getSpeed: true,
			getDirection: true
		})

		// navigation
		const navTimeline = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.4, ease: 'expo.inOut' } })

		navTimeline
			.to(el('.nav .nav__icon span:first-of-type'), { rotate: -45, y: 3.5 }, 0)
			.to(el('.nav .nav__icon span:last-of-type'), { rotate: 45, y: -3.5 }, 0)
			.to(el('.nav .nav__menu'), { autoAlpha: 1 }, 0)

		el('.nav .nav__icon').addEventListener('click', () => {
			navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse()
		})

		// page transition
		const pageTransition = el('.page__transition')
		const pageTransitionPane = els('.page__transition__pane')

		barba.init({
			transitions: [
				{
					name: 'home-to-about',
					from: {
						namespace: ['home']
					},
					to: {
						namespace: ['about']
					},
					beforeLeave() {
						const pageTransitionTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.inOut' } })
						return pageTransitionTimeline
							.set(pageTransitionPane, { backgroundColor: '#aee' }, 0)
							.to(pageTransition, { autoAlpha: 1, duration: 0.1 }, 0)
							.to(pageTransitionPane, { scaleY: 1, stagger: 0.1 }, 0)
					},
					leave() {
						return scroll.destroy()
					},
					beforeEnter() {
						navTimeline.reverse()
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
				},
				{
					name: 'about-to-home',
					from: {
						namespace: ['about']
					},
					to: {
						namespace: ['home']
					},
					beforeLeave() {
						const pageTransitionTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.inOut' } })
						return pageTransitionTimeline
							.set(pageTransitionPane, { backgroundColor: '#eaa' }, 0)
							.to(pageTransition, { autoAlpha: 1, duration: 0.1 }, 0)
							.to(pageTransitionPane, { scaleY: 1, stagger: 0.1 }, 0)
					},
					leave() {
						return scroll.destroy()
					},
					beforeEnter() {
						navTimeline.reverse()
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
				}
			]
		})

		// scroll to
		if (el('.page__home')) {
			el('.js-demo__title__scroll').addEventListener('click', () => {
				scroll.scrollTo(el('.js-demo__img__second'), -25)
			})
		}

	}, 100)

})