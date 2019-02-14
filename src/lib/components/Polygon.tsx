import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {PolygonProps} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'

const Polygon: React.FunctionComponent<PolygonProps> = ({
  id,
  opts,
  paths,
  visible = false,
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
  const addPolygon = (polygon: google.maps.Polygon) => {
    if (!state.objects.has(id))
      dispatch({type: 'add_object', object: polygon, id: id})
  }
  const removePolygon = () => dispatch({type: 'remove_object', id: id})

  useEffect(() => {
    if (state.map === undefined) return
    setPolygon(
      new google.maps.Polygon({
        ...opts,
        map: state.map,
        paths: paths,
        visible: visible,
      }),
    )
  }, [state.map])

  useEffect(() => {
    if (polygon === undefined) return

    // Add the polygon to state.polygons
    addPolygon(polygon)

    // Remove the polygon when the component is unmounted
    return () => removePolygon()
  }, [polygon])

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

  // Modify the google.maps.Polygon object when component props change
  useEffect(() => {
    if (polygon === undefined) return
    polygon.setOptions({...opts, paths: paths, visible: visible})
  }, [opts, paths, visible])

  return null
}

export default Polygon
