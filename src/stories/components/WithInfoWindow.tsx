import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, InfoWindow, MapBox} from '../../lib'

const scope = {GoogleMapProvider, InfoWindow, MapBox}

const code = `<GoogleMapProvider>
  <MapBox apiKey="" LoadedComponent={() => <h1>Display an info window</h1>} />
  <InfoWindow 
    opts={{
      content: 'This is an info window',
      position: {lat: 39, lng: 116}
    }}
    visible
  />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
