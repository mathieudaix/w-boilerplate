const askQuestions = require('ask-questions')

let survey = {
	quality: 'Quality of the images: ',
	size: 'Size of the mobile images (tablet and desktop will be automatically calculated from this value): ',
}

askQuestions(survey).then(answers => {

	const fs = require('fs')
	const sharp = require('sharp')
	const imagemin = require('imagemin')
	const imageminWebp = require('imagemin-webp')

	const directoryFrom = 'images/resize'
	const directoryTo = 'images'

	const sizes = [
		{ name: 'small', size: parseInt(answers.size) },
		{ name: 'medium', size: parseInt(answers.size * 2) },
		{ name: 'large', size: parseInt(answers.size * 3) }
	]

	fs.readdir(directoryFrom, function (_err, list) {


		list.forEach(function (file) {
			if (!/^\..*/.test(file)) {

				const filename = file.split('.').slice(0, -1)
				const extension = file.split('.').pop()

				for (let i = 0; i < sizes.length; i++) {

					const name = sizes[i].name
					const size = sizes[i].size

					if (extension === 'jpg') {
						sharp(`${directoryFrom}/${file}`)
							.resize({ width: size })
							.jpeg({ quality: parseInt(answers.quality), progressive: true })
							.toFile(`${directoryTo}/${filename}-${name}.${extension}`)
							.then(() => {
								imagemin([`images/${filename}-${name}.jpg`], {
									destination: 'images',
									plugins: [
										imageminWebp({ quality: parseInt(answers.quality), progressive: true })
									]
								})
							})
					}

					if (extension === 'png') {
						sharp(`${directoryFrom}/${file}`)
							.resize({ width: size })
							.png({ quality: parseInt(answers.quality), progressive: true })
							.toFile(`${directoryTo}/${filename}-${name}.${extension}`)
							.then(() => {
								imagemin([`images/${filename}-${name}.png`], {
									destination: 'images',
									plugins: [
										imageminWebp({ quality: parseInt(answers.quality), progressive: true })
									]
								})
							})
					}

				}

			}
		})
	})

})
