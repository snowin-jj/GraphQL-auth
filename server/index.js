require('dotenv').config();

const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 8000;

(async () => await connectDB())();

app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}/graphql`)
);
