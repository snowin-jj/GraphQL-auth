const { sequelize } = require('../sequelize/models');

const connectDB = async () => {
  console.log('\nChecking database connection...\n');
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch (err) {
    console.error('Database connection failed: ', err);
    process.exit(1);
  }
};

module.exports = connectDB;
