const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Note {
    id: Int!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getNoteById(id: Int!): Note
    getAllNotes: [Note]
  }

  type Mutation {
    createNote(title: String!, body: String!): Note
    updateNote(id: Int!, title: String, body: String): Note
    deleteNote(id: Int!): Boolean
    deleteNotes(ids: [Int!]!): Boolean
  }
`);

module.exports = schema;
