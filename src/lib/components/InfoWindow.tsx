import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {MapContext} from '../contexts'
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
    if (visible) {
      infoWindow.open(mapContext.map, anchor)
    } else {
      infoWindow.close()
    }
  }, [infoWindow, visible])

  // Register google map event listeners
  useGoogleListener(infoWindow, 'closeclick', onCloseClick)
  useGoogleListener(infoWindow, 'content_changed', onContentChanged)
  useGoogleListener(infoWindow, 'domready', onDOMReady)
  useGoogleListener(infoWindow, 'position_changed', onPositionChanged)
  useGoogleListener(infoWindow, 'zindex_changed', onZIndexChanged)

  // Modify the google.maps.InfoWindow object when <InfoWindow> props change
  useEffect(() => {
    if (infoWindow === undefined) return
    if (anchor !== undefined && visible) infoWindow.open(mapContext.map, anchor)
    if (content !== undefined) infoWindow.setContent(content)
    infoWindow.setPosition(position)
    if (zIndex !== undefined) infoWindow.setZIndex(zIndex)
  }, [anchor, content, position, zIndex])

  return null
}

export default InfoWindow
