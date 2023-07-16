require('dotenv').config();
const { readFileSync } = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const resolvers = require('./graphql/resolvers');

const app = express();

const schema = readFileSync('server/graphql/schema.graphql', 'utf-8');

// middleware
app.use(cookieParser());

// graphql
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: buildSchema(schema),
    rootValue: resolvers,
    graphiql: true,
    context: { req, res },
  }))
);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'));
  });
}

module.exports = app;
