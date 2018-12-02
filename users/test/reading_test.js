const assert = require("assert");
const User = require("../src/User");

describe("Reading users out of database", () => {
	let joe, maria, alex, zach;
	beforeEach(done => {
		joe = new User({ name: "joe" });
		alex = new User({ name: "alex" });
		maria = new User({ name: "maria" });
		zach = new User({ name: "zach" });
		Promise.all([alex.save(), maria.save(), zach.save(), joe.save()]).then(
			() => {
				done();
			}
		);
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

	it("can skip and limit result set", done => {
		User.find({})
			.sort({ name: 1 })
			.skip(1)
			.limit(2)
			.then(users => {
				console.log(users);
				assert(users.length === 2);
				assert(users[0].name === "joe");
				assert(users[1].name === "maria");
				done();
			});
	});
});
