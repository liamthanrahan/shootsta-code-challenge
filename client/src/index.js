import 'react-hot-loader/patch'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import getRoot from 'get-root'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

render(
  <Router>
    <App />
  </Router>,
  getRoot()
)
