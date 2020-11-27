import { hot } from 'react-hot-loader/root'

import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import styled from '@emotion/styled'

import { themes, ThemeContext } from './ThemeContext'
import { Home } from './Home/Home'
import { Upload } from './Upload/Upload'

const StyledLinkContainer = styled(LinkContainer)`
  cursor: pointer;
`

const FullHeightContainer = styled(Container)`
  height: 100%;
`

const getTheme = theme => (theme === themes.light ? 'light' : 'dark')
const getOppositeTheme = theme => (theme !== themes.light ? 'light' : 'dark')

function App() {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () =>
    setTheme(theme === themes.light ? themes.dark : themes.light)

  return (
    <ThemeContext.Provider value={theme}>
      <header>
        <Navbar bg={getTheme(theme)}>
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
          <Nav>
            <Button variant={getOppositeTheme(theme)} onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </Nav>
        </Navbar>
      </header>
      <FullHeightContainer style={{ background: theme.background }}>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route route="/upload" component={Upload} />
          </Switch>
        </main>
      </FullHeightContainer>
    </ThemeContext.Provider>
  )
}

export default hot(App)
