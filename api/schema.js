const { gql } = require('apollo-server')

// scalar Upload
const typeDefs = gql`
  type Video {
    filename: String!
    path: String!
  }

  type Query {
    hello: String
    videos: [Video]
  }

  type Mutation {
    uploadVideo(file: Upload!): Video
  }
`

module.exports = typeDefs
