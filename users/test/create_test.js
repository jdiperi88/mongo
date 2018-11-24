const assert = require("assert");
const User = require("../src/User");
describe("Creating records", () => {
	it("saves a user", done => {
		const joe = new User({ name: "Joey" });
		joe.save().then(() => {
			//has joe been saved successfully?
			assert(!joe.isNew);
			done();
		});
	});
});
