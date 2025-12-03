const anObject = { y: 'y', test: () => 'zoo' }
const x = {
	__proto__: anObject,
	test() {
		return super.test() + 'x'
	}
}
x.test() //zoox