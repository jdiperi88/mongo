const mongoose = require("mongoose");
const User = require("../src/User");
const BlogPost = require("../src/BlogPost");
const Comment = require("../src/Comment");
const assert = require("assert");
describe("Associations", () => {
	let joe, blogPost, comment;
	beforeEach(done => {
		joe = new User({ name: "joe" });
		blogPost = new BlogPost({ title: "cool", content: "really is!" });
		comment = new Comment({ content: "congrats!" });

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
			done();
		});
	});

	it("saves a relation between a user and a blogpost", done => {
		User.findOne({ name: "joe" })
			.populate("blogPosts")
			.then(user => {
				console.log(user);
				assert(user.blogPosts[0].title === "cool");
				done();
			});
	});

	it.only("saves a full relation tree", done => {
		User.findOne({ name: "joe" })
			.populate({
				path: "blogPosts",
				populate: {
					path: "comments",
					model: "comment",
					populate: {
						path: "user",
						model: "user"
					}
				}
			})
			.then(user => {
				console.log(user.blogPosts[0].comments[0].user.name);
				assert(user.name === "joe");
				assert(user.blogPosts[0].title === "cool");
				assert(user.blogPosts[0].comments[0].content === "congrats!");
				assert(user.blogPosts[0].comments[0].user === "joe");
				done();
			});
	});
});
