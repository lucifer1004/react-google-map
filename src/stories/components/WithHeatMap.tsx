import React from 'react'
import ReactLive from './ReactLive'
import {GoogleMapProvider, MapBox, HeatMap} from '../../lib'

const scope = {GoogleMapProvider, MapBox, HeatMap}

const code = `<GoogleMapProvider>
  <MapBox
    apiKey=""
    LoadedComponent={() => <h1>Display a heat map</h1>}
    opts={{
      center: {lat: 37.774546, lng: -122.433523},
      zoom: 13,
      mapTypeId: 'satellite',
    }}
    useVisualization
  />
  <HeatMap
    data={[
      {lat: 37.782, lng: -122.447},
      {lat: 37.782, lng: -122.445},
      {lat: 37.782, lng: -122.443},
      {lat: 37.782, lng: -122.441},
      {lat: 37.782, lng: -122.439},
      {lat: 37.782, lng: -122.437},
      {lat: 37.782, lng: -122.435},
      {lat: 37.785, lng: -122.447},
      {lat: 37.785, lng: -122.445},
      {lat: 37.785, lng: -122.443},
      {lat: 37.785, lng: -122.441},
      {lat: 37.785, lng: -122.439},
      {lat: 37.785, lng: -122.437},
      {lat: 37.785, lng: -122.435},
    ]}
  />
</GoogleMapProvider>
`

export default () => <ReactLive code={code} scope={scope} />
