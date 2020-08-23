import 'react-hot-loader/patch'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import getRoot from 'get-root'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import App from './components/App'

const client = new ApolloClient({
  link: createUploadLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache(),
})

render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  getRoot()
)
