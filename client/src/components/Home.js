import { hot } from 'react-hot-loader/root'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import List from './List'
import Upload from './Upload'

function Home() {
  return (
    <Container>
      <header>
        <Navbar>
          <Navbar.Brand>Video Hub</Navbar.Brand>
        </Navbar>
      </header>
      <main>
        <List />
      </main>
      <footer>
        <Upload />
      </footer>
    </Container>
  )
}

export default hot(Home)
