import { hot } from 'react-hot-loader/root'

import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import Home from './Home'
import Upload from './Upload'

function App() {
  return (
    <>
      <header>
        <Navbar bg="light">
          <Navbar.Brand>
            <Link to="/">Video Hub</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
              <LinkContainer to="/upload">
                <Nav.Item>Upload</Nav.Item>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <Container>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route route="/upload" component={Upload} />
          </Switch>
        </main>
      </Container>
    </>
  )
}

export default hot(App)
