const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//runs code before the mocha library runs tests
before(done => {
	mongoose.connect("mongodb://localhost/users_test");
	mongoose.connection
		.once("open", () => {
			console.log("good to go");
			done();
		})
		.on("error", error => {
			console.warn("warning", error);
		});
});

beforeEach(done => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
		//ready to run next test
	});
});
