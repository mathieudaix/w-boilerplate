const fs = require('fs')

const pages = ['index', 'about', 'contact']

pages.forEach(file => {
	fs.appendFile('src/' + file + '.pug', '', function (err) {
		if (err) throw err;
	})
})

module.exports = { pages }