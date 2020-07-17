const fs = require('fs')

fs.copyFile('docs/.htaccess', 'dist/docs/.htaccess', err => {
	if (err) throw err
})