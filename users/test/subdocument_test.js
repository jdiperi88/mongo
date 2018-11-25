const assert = require("assert");
const User = require("../src/User");

describe("subdocuments", () => {
	it("can create a subdocument", done => {
		const joe = new User({ name: "joe", posts: [{ title: "New Title" }] });
		joe.save().then(() =>
			User.findOne({ name: "joe" }).then(user => {
				assert(user.posts[0].title);
				done();
			})
		);
	});

	it("can add subdocuments to an existing record", done => {
		const joe = new User({ name: "joe" });
		joe
			.save()
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				user.posts.push({ title: "new post" });
				return user.save();
			})
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				assert(user.posts[0].title === "new post");
				done();
			});
	});

	it("can remove subdocuments on an existing record", done => {
		const joe = new User({
			name: "joe",
			posts: [{ title: "new title" }]
		});
		joe
			.save()
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({ name: "joe" }))
			.then(user => {
				assert(user.posts.length === 0);
				done();
			});
	});
});
