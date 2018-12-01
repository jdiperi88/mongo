const mongoose = require("mongoose");
const assert = require("assert");

const User = require("../src/User");
const BlogPost = require("../src/BlogPost");

describe("Middleware", () => {
	let joe, blogPost;

	beforeEach(done => {
		joe = new User({ name: "joe" });
		blogPost = new BlogPost({ title: "cool", content: "really is!" });

		joe.blogPosts.push(blogPost);
		Promise.all([joe.save(), blogPost.save()]).then(() => {
			done();
		});
	});

	it("users clean up dangling blogposts on delete", done => {
		joe
			.remove()
			.then(() => BlogPost.count())
			.then(count => {
				assert(count === 0);
				done();
			});
	});
});
