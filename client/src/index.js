import 'react-hot-loader/patch'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import getRoot from 'get-root'
import { render } from 'react-dom'

import Home from './components/Home'

render(<Home />, getRoot())
