import React from 'react'
import {MapBox} from './lib'

export default () => (
  <div className="App">
    <header className="App-header">
      <MapBox apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g" zoomLevel={14} />
    </header>
  </div>
)
