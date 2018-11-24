const assert = require("assert");
const User = require("../src/User");

describe("Reading users out of database", () => {
	let joe;
	beforeEach(done => {
		joe = new User({ name: "joe" });
		joe.save().then(() => {
			done();
		});
	});
	it("finds all users with a name of joe", done => {
		User.find({ name: "joe" }).then(users => {
			console.log(joe.id, users[0].id);
			assert(joe.id === users[0].id);
			done();
		});
	});

	it("finds a user with a particular id", done => {
		User.findOne({ _id: joe._id }).then(user => {
			console.log(joe.id, user);
			assert(user.name === "joe");
			done();
		});
	});
});
