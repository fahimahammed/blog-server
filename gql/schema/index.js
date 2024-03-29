// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }

  type User {
    _id: ID
    id: Int
    name: String
    username: String
    email: String
    posts: [Post]
  }

  type Post {
    _id: ID!
    userId: Int
    title: String
    body: String
    user: User
  }

  input newPost {
    userId: Int
    title: String
    body: String
  }

  input updatedPost {
    _id: ID!
    title: String
    body: String
  }

  type Mutation {
    addPost(input: newPost): Boolean
    deletePost(id: ID!): Boolean
    updatePost(input: updatedPost): Boolean
  }
`;

module.exports = typeDefs;