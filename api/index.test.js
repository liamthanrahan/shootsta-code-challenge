const { createTestClient } = require('apollo-server-testing')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { gql } = require('apollo-server')
const { describe } = require('yargs')

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

describe('Queries', () => {
  it('gets an empty list of videos when nothing is uploaded', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query, mutate } = createTestClient(server)
    const res = await query({ query: GET_VIDEOS })
    expect(res).toMatchSnapshot()
  })

  //   it('gets a list of videos when something is in the video folder', async () => {
  //     const server = new ApolloServer({
  //       typeDefs,
  //       resolvers,
  //     })

  //     const { query, mutate } = createTestClient(server)
  //     const res = await query({ query: GET_VIDEOS })
  //     expect(res).toMatchSnapshot()
  //   })
})

// describe('Mutations', () => {
//     it('upload a video file', async () => {
//         const server = new ApolloServer({
//           typeDefs,
//           resolvers,
//         })

//         const { query, mutate } = createTestClient(server)
//         const res = await query({ query: GET_VIDEOS })
//         expect(res).toMatchSnapshot()
//       })
// })
