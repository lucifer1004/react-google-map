import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {GoogleMapMarker, MarkerProps} from '../common/types'

const Marker: React.FunctionComponent<MarkerProps> = ({
  id,
  opts = {
    position: {lat: 0, lng: 0},
  },
  onAnimationChanged,
  onClick,
  onClickableChanged,
  onCursorChanged,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onPositionChanged,
  onRightClick,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZIndexChanged,
}) => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [marker, setMarker] = useState(
    (undefined as unknown) as GoogleMapMarker,
  )
  const addMarker = (marker: GoogleMapMarker) =>
    dispatch({type: 'add_marker', marker: marker})
  const removeMarker = (marker: GoogleMapMarker) =>
    dispatch({type: 'remove_marker', marker: marker})

  useEffect(() => {
    if (state.map === undefined) return
    setMarker(new google.maps.Marker({...opts, map: state.map}))
  }, [state.map])

  useEffect(() => {
    if (marker === undefined) return

    // Add the marker to state.markers
    if (id !== undefined) marker.id = id
    addMarker(marker)

    // Remove the marker when the component is unmounted
    return () => removeMarker(marker)
  }, [marker])

  // Register event listeners
  useGoogleListener(marker, [
    {name: 'animation_changed', handler: onAnimationChanged},
    {name: 'click', handler: onClick},
    {name: 'clickable_changed', handler: onClickableChanged},
    {name: 'cursor_changed', handler: onCursorChanged},
    {name: 'dblclick', handler: onDoubleClick},
    {name: 'drag', handler: onDrag},
    {name: 'dragend', handler: onDragEnd},
    {name: 'draggable_changed', handler: onDraggableChanged},
    {name: 'dragstart', handler: onDragStart},
    {name: 'flat_changed', handler: onFlatChanged},
    {name: 'icon_changed', handler: onIconChanged},
    {name: 'mousedown', handler: onMouseDown},
    {name: 'mouseout', handler: onMouseOut},
    {name: 'mouseover', handler: onMouseOver},
    {name: 'mouseup', handler: onMouseUp},
    {name: 'position_changed', handler: onPositionChanged},
    {name: 'rightclick', handler: onRightClick},
    {name: 'shape_changed', handler: onShapeChanged},
    {name: 'title_changed', handler: onTitleChanged},
    {name: 'visible_changed', handler: onVisibleChanged},
    {name: 'zindex_changed', handler: onZIndexChanged},
  ])

  // Modify the GoogleMapMarker object when component props change
  useEffect(() => {
    if (marker === undefined) return
    marker.setOptions(opts)
  }, [opts])

  return null
}

export default Marker
