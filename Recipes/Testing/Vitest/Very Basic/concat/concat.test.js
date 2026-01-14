import { describe, expect, test } from 'vitest'
import { concatFn } from './concat.js';

describe("concat", () => {
	test("Given", () => {
		let data = [{ id: 10, name: 'Lucky' }];
		expect(concatFn(data[0]).id_name).toBe("10_Lucky");
	})
})