const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { sequelize, Note } = require("./models");
const schema = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    context: { models: { Note } },
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
