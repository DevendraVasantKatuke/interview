// 2-way communication while a generator is running
function* calculator(input) {
	var doubleThat = 2 * (yield (input / 2))
	var another = yield (doubleThat)
	return (input * doubleThat * another)
}
const calc = calculator(10)
calc.next()
calc.next(7)
calc.next(100)