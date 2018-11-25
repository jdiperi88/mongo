const assert = require("assert");
const User = require("../src/User");

describe("Updating records", () => {
	let joe;

	beforeEach(done => {
		joe = new User({ name: "joe", postCount: 0 });
		joe.save().then(() => {
			done();
		});
	});

	function assertName(operation, done) {
		operation
			.then(() => User.findOne({ name: "alex" }))
			.then(user => {
				assert(user.name === "alex");
				done();
			});
	}

	it("instance type using set and save", done => {
		joe.set("name", "alex");
		assertName(joe.save(), done);
	});

	it("instance type using update", done => {
		assertName(joe.update({ name: "alex" }), done);
	});

	it("A model class can update", done => {
		assertName(User.update({ name: "joe" }, { name: "alex" }), done);
	});

	it("A model class can update", done => {
		assertName(User.findOneAndUpdate({ name: "joe" }, { name: "alex" }), done);
	});

	it("A model class can update", done => {
		assertName(User.findByIdAndUpdate(joe.id, { name: "alex" }), done);
	});

	it("Increment post count by one", done => {
		User.update({ name: "joe" }, { $inc: { postCount: 10 } })
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				console.log(user);
				assert(user.postCount === 10);
				done();
			});
	});
});
