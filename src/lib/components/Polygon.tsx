import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '..'
import {PolygonProps} from '../common/types'
import {MapContext} from '../contexts'

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
  const mapContext = useContext(MapContext)
  const [polygon, setPolygon] = useState(
    (undefined as unknown) as google.maps.Polygon,
  )

  useEffect(() => {
    if (mapContext.map === undefined) return
    setPolygon(
      new google.maps.Polygon({
        clickable: clickable,
        draggable: draggable,
        editable: editable,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        geodesic: geodesic,
        map: mapContext.map,
        paths: paths,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokePosition: strokePosition,
        strokeWeight: strokeWeight,
        visible: visible,
        zIndex: zIndex,
      }),
    )
  }, [mapContext])

  // Register google map event listeners
  useGoogleListener(polygon, 'click', onClick)
  useGoogleListener(polygon, 'dblclick', onDoubleClick)
  useGoogleListener(polygon, 'drag', onDrag)
  useGoogleListener(polygon, 'dragend', onDragEnd)
  useGoogleListener(polygon, 'dragstart', onDragStart)
  useGoogleListener(polygon, 'mousedown', onMouseDown)
  useGoogleListener(polygon, 'mouseout', onMouseOut)
  useGoogleListener(polygon, 'mouseover', onMouseOver)
  useGoogleListener(polygon, 'mouseup', onMouseUp)
  useGoogleListener(polygon, 'rightclick', onRightClick)

  return null
}

export default Polygon
