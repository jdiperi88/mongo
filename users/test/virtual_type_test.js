const assert = require("assert");
const User = require("../src/User");
describe("Virtual types", () => {
	it("post count returns number of posts", done => {
		const joe = new User({
			name: "Joey",
			posts: [{ title: "post title" }]
		});
		joe
			.save()
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				assert(joe.postCount === 1);
				done();
			});
	});
});
