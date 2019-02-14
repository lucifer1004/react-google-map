import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {InfoWindowProps} from '../common/types'

const InfoWindow: React.FunctionComponent<InfoWindowProps> = ({
  anchor,
  opts = {
    position: {lat: 40.7128, lng: -74.006},
  },
  visible,
  onCloseClick,
  onContentChanged,
  onDOMReady,
  onPositionChanged,
  onZIndexChanged,
}) => {
  const {state} = useContext(GoogleMapContext)
  const [infoWindow, setInfoWindow] = useState(
    (undefined as unknown) as google.maps.InfoWindow,
  )

  useEffect(() => {
    if (state.map === undefined) return
    setInfoWindow(new google.maps.InfoWindow(opts))
  }, [state.map])

  useEffect(() => {
    if (infoWindow === undefined) return

    // Open or close the info window according to the `visible` prop
    if (visible) infoWindow.open(state.map, anchor)
    else infoWindow.close()

    // Close the info window when the component is unmounted
    return () => infoWindow.close()
  }, [infoWindow, visible])

  // Register event listeners
  useGoogleListener(infoWindow, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'content_changed', handler: onContentChanged},
    {name: 'domready', handler: onDOMReady},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'zindex_changed', handler: onZIndexChanged},
  ])

  // Modify the google.maps.InfoWindow object when component props change
  useEffect(() => {
    if (infoWindow === undefined) return
    infoWindow.setOptions(opts)
  }, [opts])

  return null
}

export default InfoWindow
