import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, OverlayView} from '../../lib'

const scope = {GoogleMapProvider, MapBox, OverlayView}

const code = `<GoogleMapProvider>
  <MapBox 
    apiKey=""
    LoadedComponent={() => <h1>Display an OverlayView</h1>}
  />
  <OverlayView position={{lat: 40.7128, lng: -74.006}}>
    <h1>This is an overlay</h1>
  </OverlayView>
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
