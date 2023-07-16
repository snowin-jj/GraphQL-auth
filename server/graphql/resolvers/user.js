const bcrypt = require('bcryptjs');

const { User } = require('../../sequelize/models');
const generateToken = require('../../utils/token');
const sendMail = require('../../utils/sendmail');
const { checkUser, protect } = require('../../middleware/auth.js');

/*
 * Get the user by id
 */
const getUser = async ({ id }) => {
  return await User.findByPk(id);
};

/*
 * Get all users
 */
const getUsers = protect(async (req, res) => {
  return await User.findAll();
});

/*
 * Sign up the user
 */
const registerUser = async ({ name, email, password }, { req, res }) => {
  if (!name || !email || !password)
    throw new Error('Please provide the required details');

  // Check if the user account already exists
  const userExits = await User.findOne({ where: { email } });
  if (userExits) throw new Error('User alread exits');

  const user = await User.create({ name, email, password });

  if (user) {
    await generateToken(res, user.id);
    // TODO: send verification mail
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
};

/*
 * Sign the user in
 */
const authUser = async ({ email, password }, { req, res }) => {
  if (!email || !password)
    throw new Error('Please provide the required details');

  // Check if the user account exists and the password matches
  const user = await User.scope('auth').findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error('Invalid credentials');

  await generateToken(res, user.id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/*
 * LOG the user out
 */
const logoutUser = (_, { req, res }) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return { message: 'User logged out' };
};

/*
 * UPDATE the user profile
 */
const updateUser = protect(
  async (req, res, { user, name, email, password }) => {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) user.password = password;

    const updatedUser = await user.save();
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
);

module.exports = {
  getUser,
  getUsers,
  authUser,
  registerUser,
  logoutUser,
  updateUser,
};
