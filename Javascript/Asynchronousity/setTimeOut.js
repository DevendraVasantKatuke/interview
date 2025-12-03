setTimeout(function () {
	console.log('I promised to run after 1s')
	setTimeout(function () {
		console.log('I promised to run after 2s')
	}, 1000)
}, 1000)

// can be written as
const wait = () => new Promise((resolve, reject) => {
	setTimeout(resolve, 1000)
})
wait().then(() => {
	console.log('I promised to run after 1s')
	return wait()
}).then(() => console.log('I promised to run after 2s'))