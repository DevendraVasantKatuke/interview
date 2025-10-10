const profile = {
	firstName: '',
	lastName: '',
	setName: function (name) {
		let splitName = function (n) {
			let nameArray = n.split(' ');
			this.firstName = nameArray[0];
			this.lastName = nameArray[1];
		}
		splitName(name);
	}
}
profile.setName('john doe');
console.log(firstName);