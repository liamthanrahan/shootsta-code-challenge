const resolvers = {
  Query: {
    hello: () => 'Hello World',
    videos: async (parent, args, { dataSources }) =>
      dataSources.VideosAPI.videos(),
  },
  Mutation: {
    uploadVideo: async (parent, args, { dataSources }) =>
      dataSources.VideosAPI.uploadVideo(args),
  },
}

module.exports = resolvers
