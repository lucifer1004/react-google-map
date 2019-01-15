import React from 'react'
import ReactDOM from 'react-dom'
import MapBox from '../MapBox'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MapBox />, div)
  ReactDOM.unmountComponentAtNode(div)
})
