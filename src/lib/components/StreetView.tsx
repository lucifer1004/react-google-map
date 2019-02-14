import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'
import {StreetViewProps} from '../common/types'
import RandomId from '../helpers/generateRandomId'

const StreetView: React.FunctionComponent<StreetViewProps> = ({
  mapClass,
  mapStyle = {
    height: '100vh',
    width: '100vw',
  },
  opts = {
    position: {lat: 40.7128, lng: -74.006},
  },
  visible = false,
  onCloseClick,
  onPanoChanged,
  onPositionChanged,
  onPovChanged,
  onResize,
  onStatusChanged,
  onVisibleChanged,
  onZoomChanged,
}) => {
  const {state} = useContext(GoogleMapContext)
  const [streetView, setStreetView] = useState(
    (undefined as unknown) as google.maps.StreetViewPanorama,
  )

  // Generate a random id for the DOM node where Google Map will be inserted
  const [containerId] = useState(`street-view-${RandomId()}`)

  useEffect(() => {
    if (state.map === undefined) return
    setStreetView(
      new google.maps.StreetViewPanorama(
        document.getElementById(containerId) as HTMLElement,
        {...opts, visible: visible},
      ),
    )
  }, [state.map])

  useGoogleListener(streetView, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'pano_changed', handler: onPanoChanged},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'pov_changed', handler: onPovChanged},
    {name: 'resize', handler: onResize},
    {name: 'status_changed', handler: onStatusChanged},
    {name: 'visible_changed', handler: onVisibleChanged},
    {name: 'zoom_changed', handler: onZoomChanged},
  ])

  // Modify the google.maps.StreetViewPanorama object when component props change
  useEffect(() => {
    if (streetView === undefined) return
    streetView.setOptions({...opts, visible: visible})
  }, [opts, visible])

  return <div className={mapClass} id={containerId} style={mapStyle} />
}

export default StreetView
