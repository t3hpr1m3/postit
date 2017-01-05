'use strict'

import React, { Component } from 'react'

import { IndexLink, Link } from 'react-router'

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

import { Nav, Navbar, NavItem } from 'react-bootstrap'

const App = ({children}) => (
  <div id='app-view'>
    <header>
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to={{ pathname: '/' }}>PostIt</IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    </header>
    <div className="container-fluid">
      <div className="row">
        <Nav className="col-sm-3 col-md-2" bsStyle="pills" stacked activeKey={1}>
          <IndexLinkContainer to={{ pathname: '/' }}>
            <NavItem eventKey={1}>Dashboard</NavItem>
          </IndexLinkContainer>
        </Nav>
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          {children}
        </main>
      </div>
    </div>
  </div>
)

export default App
