import React, {useContext, useEffect, useState} from 'react'
import {MapContext} from '../contexts'

const Marker: React.FunctionComponent<google.maps.MarkerOptions> = ({
  position,
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
