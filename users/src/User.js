const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String
});

// represents the ENTIRE COLLECTION not a single instance
const User = mongoose.model("user", UserSchema);

module.exports = User;
