const { createTestClient } = require('apollo-server-testing')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { gql } = require('apollo-server')

const GET_VIDEOS = gql`
  query getVideos {
    videos {
      filename
      path
    }
  }
`

const UPLOAD_VIDEO = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file: $file) {
      filename
    }
  }
`

it('gets an empty list of videos when nothing is uploaded', async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { query } = createTestClient(server)
  const res = await query({ query: GET_VIDEOS })
  console.log('res', res)
  // expect(res).toMatchSnapshot()
})
