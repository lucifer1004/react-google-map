import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {InfoWindowProps} from '../common/types'

const InfoWindow: React.FunctionComponent<InfoWindowProps> = ({
  anchor,
  content,
  disableAutoPan = false,
  maxWidth,
  pixelOffset,
  position,
  visible = false,
  zIndex,
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
    setInfoWindow(
      new google.maps.InfoWindow({
        content: content,
        disableAutoPan: disableAutoPan,
        maxWidth: maxWidth,
        pixelOffset: pixelOffset,
        position: position,
        zIndex: zIndex,
      }),
    )
  }, [state])

  useEffect(() => {
    if (infoWindow === undefined) return
    if (visible) {
      infoWindow.open(state.map, anchor)
    } else {
      infoWindow.close()
    }
  }, [infoWindow, visible])

  // Register google map event listeners
  useGoogleListener(infoWindow, [
    {name: 'closeclick', handler: onCloseClick},
    {name: 'content_changed', handler: onContentChanged},
    {name: 'domready', handler: onDOMReady},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'zindex_changed', handler: onZIndexChanged},
  ])

  // Modify the google.maps.InfoWindow object when <InfoWindow> props change
  useEffect(() => {
    if (infoWindow === undefined) return
    if (anchor !== undefined && visible) infoWindow.open(state.map, anchor)
    if (content !== undefined) infoWindow.setContent(content)
    infoWindow.setPosition(position)
    if (zIndex !== undefined) infoWindow.setZIndex(zIndex)
  }, [anchor, content, position, zIndex])

  return null
}

export default InfoWindow
