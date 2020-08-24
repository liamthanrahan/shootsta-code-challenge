const { createTestClient } = require('apollo-server-testing')
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { gql } = require('apollo-server')

const mockSource = {
  videos: jest.fn(),
  uploadVideo: jest.fn(),
}

const GET_VIDEOS = gql`
  query getVideos {
    videos {
      filename
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
    dataSources: () => ({ VideosAPI: mockSource }),
  })

  const { query } = createTestClient(server)
  mockSource.videos.mockReturnValueOnce([])
  const res = await query({ query: GET_VIDEOS })
  expect(res.data).toEqual({ videos: [] })
})

// TODO Need to improve this test. Currently does not test much
it('uploads a video file', async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ VideosAPI: mockSource }),
  })

  const { mutate } = createTestClient(server)
  mockSource.uploadVideo.mockReturnValueOnce({ filename: 'test_file.mp4' })

  const res2 = await mutate({
    mutation: UPLOAD_VIDEO,
    variables: { file: 'test_file.mp4' },
  })
  expect(res2.data).toEqual({ uploadVideo: { filename: 'test_file.mp4' } })
})
