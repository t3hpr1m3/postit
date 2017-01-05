'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from '../shared/routes'

import '../style/main.scss'
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('react-view')
)
