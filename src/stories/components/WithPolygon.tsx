import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, Polygon} from '../../lib'

const scope = {GoogleMapProvider, MapBox, Polygon}

const code = `<GoogleMapProvider>
  <MapBox
    apiKey=""
    LoadedComponent={() => <h1>Display a polygon</h1>}
    opts={{
      center: {lat: 39, lng: 116},
      zoom: 10,
    }}
  />
  <Polygon
    id="polygon"
    paths={[
      {lat: 39.1, lng: 116.1},
      {lat: 39.1, lng: 116.3},
      {lat: 39.2, lng: 116.3},
    ]}
    visible
  />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
