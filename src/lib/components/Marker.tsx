import React, {useContext, useEffect, useState} from 'react'
import {MapContext} from '../contexts'
import {MarkerProps} from '../common/types'

const Marker: React.FunctionComponent<MarkerProps> = ({
  position = {lat: 39, lng: 116},
}) => {
  const mapContext = useContext(MapContext)
  const [marker, setMarker] = useState(
    (undefined as unknown) as google.maps.Marker,
  )

  useEffect(
    () => {
      if (mapContext.map === undefined) return
      setMarker(
        new google.maps.Marker({
          position: position,
          map: mapContext.map,
          draggable: true,
        }),
      )
    },
    [mapContext],
  )
  return null
}

export default Marker
