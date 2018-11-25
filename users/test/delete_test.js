const assert = require("assert");
const User = require("../src/User");

describe("Deleting a User", () => {
	let joe;
	beforeEach(() => {
		joe = new User({ name: "joe" });
		joe.save().then(() => {
			//has joe been saved successfully?
			done();
		});
	});
	it("model instance remove a user", done => {
		joe
			.remove()
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				console.log(user);
				assert(user === null);
				done();
			});
	});

	it("class method remove a user", done => {
		User.remove({ name: "joe" })
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				console.log(user);
				assert(user === null);
				done();
			});
	});

	it("class method findAndRemove a user", done => {
		User.findOneAndRemove({ name: "joe" })
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				console.log(user);
				assert(user === null);
				done();
			});
	});

	it("class method findByIdAndRemove a user", done => {
		User.findByIdAndRemove(joe.id)
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				console.log(user);
				assert(user === null);
				done();
			});
	});
});
