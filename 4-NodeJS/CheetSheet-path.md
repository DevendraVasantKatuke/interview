```
const fs = require('fs')

fs.realpath('/etc/passwd', function (err, path) {
	path // => "/private/etc/passwd"
})

const path = require('path')
dir = path.join('etc', 'passwd')
dir = path.resolve('/etc', 'passwd', '..', 'var')

path.dirname('/etc/passwd') //      => "/etc"
path.basename('/etc/passwd') //     => "passwd"
path.basename('/etc/rc.d', '.d') // => "rc"
```