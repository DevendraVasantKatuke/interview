function concatFn(obj) {
	obj.id_name = obj.id + "_" + obj.name;
	return obj;
}

function addition(n1, n2) {
	return n1 + n2;
}

export { concatFn, addition };
