const { readFileSync } = require('fs');
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

module.exports = app;
