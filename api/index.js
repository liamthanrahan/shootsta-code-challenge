const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const dataSource = require('./dataSource')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ VideosAPI: dataSource }),
})

const app = express()
server.applyMiddleware({ app })

app.use('/videos', express.static(__dirname + '/videos'))

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
