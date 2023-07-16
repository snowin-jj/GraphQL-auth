const {
	getUser,
	getUsers,
	authUser,
	registerUser,
	logoutUser,
	updateUser,
} = require('./user');

const resolvers = {
	getUser,
	getUsers,
	authUser,
	registerUser,
	updateUser,
	logoutUser,
};

module.exports = resolvers;
