const fs = require('fs');

const dirents = fs.readdirSync('images', { withFileTypes: true })

const filesNames = dirents
	.filter(dirent => dirent.isFile())
	.map(dirent => dirent.name);

filesNames.forEach(function (file) {
	if (!/^\..*/.test(file)) {

		const path = './images/' + file
		try {
			fs.unlinkSync(path)
		} catch (err) {
			console.error(err)
		}

	}
})