'use strict'

import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/pages/Home'

const NotFound = () => (
  <h2>Not found</h2>
)

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
)
