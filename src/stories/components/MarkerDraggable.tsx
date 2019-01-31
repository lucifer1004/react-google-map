import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, Marker} from '../../lib'

const scope = {GoogleMapProvider, MapBox, Marker}

const code = `<GoogleMapProvider>
  <MapBox apiKey="" LoadedComponent={() => <h1>The marker can be draggable</h1>} />
  <Marker 
    id="marker"
    opts={{
      draggable: true,
      label: 'drag me',
      position: {lat: 40.7128, lng: -74.0060},
    }} 
  />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
