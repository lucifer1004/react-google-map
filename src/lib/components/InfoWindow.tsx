import React, {useContext, useEffect, useState} from 'react'
import {MapContext} from '../contexts'
import {InfoWindowProps} from '../common/types'

const InfoWindow: React.FunctionComponent<InfoWindowProps> = ({
  content,
  position,
}) => {
  const mapContext = useContext(MapContext)
  const [infoWindow, setInfoWindow] = useState(
    (undefined as unknown) as google.maps.InfoWindow,
  )

  useEffect(() => {
    if (mapContext.map === undefined) return
    setInfoWindow(
      new google.maps.InfoWindow({
        position: position,
        content: content,
      }),
    )
  }, [mapContext])

  useEffect(() => {
    if (infoWindow === undefined) return
    infoWindow.open(mapContext.map)
  }, [infoWindow])

  return null
}

export default InfoWindow
