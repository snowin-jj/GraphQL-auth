const JWT = require('jsonwebtoken');

const { User } = require('../sequelize/models');

const protect = (handler) => {
  return async (payload, { req, res }) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
          attributes: [
            'id',
            'name',
            'email',
            'isVerified',
            'createdAt',
            'updatedAt',
          ],
        });
        return handler(req, res, { user, ...payload });
      } catch (err) {
        console.error(err);
        throw new Error('Not authorized, invalid token');
      }
    } else {
      throw new Error('Not authorized, no token');
    }
  };
};

module.exports = { protect };
