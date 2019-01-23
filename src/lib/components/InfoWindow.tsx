import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '..'
import {MapContext} from '../contexts'
import {InfoWindowProps} from '../common/types'

const InfoWindow: React.FunctionComponent<InfoWindowProps> = ({
  content,
  disableAutoPan = false,
  maxWidth,
  pixelOffset,
  position,
  zIndex,
  onCloseClick,
  onContentChanged,
  onDOMReady,
  onPositionChanged,
  onZIndexChanged,
}) => {
  const mapContext = useContext(MapContext)
  const [infoWindow, setInfoWindow] = useState(
    (undefined as unknown) as google.maps.InfoWindow,
  )

  useEffect(() => {
    if (mapContext.map === undefined) return
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
  }, [mapContext])

  useEffect(() => {
    if (infoWindow === undefined) return
    infoWindow.open(mapContext.map)
  }, [infoWindow])

  // Register google map event listeners
  useGoogleListener(infoWindow, 'closeclick', onCloseClick)
  useGoogleListener(infoWindow, 'content_changed', onContentChanged)
  useGoogleListener(infoWindow, 'domready', onDOMReady)
  useGoogleListener(infoWindow, 'position_changed', onPositionChanged)
  useGoogleListener(infoWindow, 'zindex_changed', onZIndexChanged)

  return null
}

export default InfoWindow
