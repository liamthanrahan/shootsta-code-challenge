import { hot } from 'react-hot-loader/root'

import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import styled from '@emotion/styled'

import Home from './Home'
import Upload from './Upload'

const StyledLinkContainer = styled(LinkContainer)`
  cursor: pointer;
`

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
              <StyledLinkContainer to="/upload">
                <Nav.Item>Upload</Nav.Item>
              </StyledLinkContainer>
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
