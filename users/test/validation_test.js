const assert = require("assert");
const User = require("../src/User");

describe("Validating records", () => {
	it("requires a user name", done => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		const message = validationResult.errors.name.message;
		console.log(message);
		assert(message === "Name is required");
		done();
	});

	it("requires a user name longer than 2 characters", done => {
		const user = new User({ name: "Al" });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === "Name must be longer than two characters");
		done();
	});

	it("disallows invalid records from being saved", done => {
		const user = new User({ name: "Al" });
		user.save().catch(validationResult => {
			const { message } = validationResult.errors.name;
			assert(message === "Name must be longer than two characters");
			done();
		});
	});
});
