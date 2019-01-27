import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {PolygonProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Polygon: React.FunctionComponent<PolygonProps> = ({
  clickable = true,
  draggable = false,
  editable = false,
  fillColor,
  fillOpacity,
  geodesic = false,
  paths,
  strokeColor,
  strokeOpacity,
  strokePosition,
  strokeWeight,
  visible = true,
  zIndex,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
}) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [polygon, setPolygon] = useState(
    (undefined as unknown) as google.maps.Polygon,
  )

  useEffect(() => {
    if (state.map !== undefined)
      setPolygon(
        new google.maps.Polygon({
          clickable: clickable,
          draggable: draggable,
          editable: editable,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          geodesic: geodesic,
          map: state.map,
          paths: paths,
          strokeColor: strokeColor,
          strokeOpacity: strokeOpacity,
          strokePosition: strokePosition,
          strokeWeight: strokeWeight,
          visible: visible,
          zIndex: zIndex,
        }),
      )
  }, [state.map])

  // Register google map event listeners
  useGoogleListener(polygon, [
    {name: 'click', handler: onClick},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'dragstart', handler: onDragStart},
    {name: 'mousedown', handler: onMouseDown},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'mouseup', handler: onMouseUp},
    {name: 'rightclick', handler: onRightClick},
  ])

  return null
}

export default Polygon
