import React from 'react'
import useGoogleAPI from '../hooks/useGoogleAPI'

const MapBox: React.FunctionComponent = () => {
  const loaded = useGoogleAPI('AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g')
  return <div>{loaded ? <h1>This is a map</h1> : 'Loading...'}</div>
}

export default MapBox
