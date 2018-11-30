const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");
const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: name => name.length > 2,
			message: "Name must be longer than two characters"
		},
		required: [true, "Name is required"]
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "blogPost"
		}
	]
});

UserSchema.virtual("postCount").get(function() {
	return this.posts.length;
});

UserSchema.pre("remove", function(next) {
	// this === to the model instance ...eg joe
	const BlogPost = mongoose.model("blogPost");
	BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

// represents the ENTIRE COLLECTION not a single instance
const User = mongoose.model("user", UserSchema);

module.exports = User;
