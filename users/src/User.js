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

// represents the ENTIRE COLLECTION not a single instance
const User = mongoose.model("user", UserSchema);

module.exports = User;
