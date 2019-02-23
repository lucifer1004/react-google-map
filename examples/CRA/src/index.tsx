import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {GoogleMapProvider} from '@lucifer1004/react-google-map'
require('dotenv').config()

ReactDOM.render(
  <GoogleMapProvider>
    <App />
  </GoogleMapProvider>,
  document.getElementById('root'),
)
