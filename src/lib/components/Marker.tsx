import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {MarkerProps} from '../common/types'

const Marker: React.FunctionComponent<MarkerProps> = ({
  anchorPoint,
  animation,
  clickable = true,
  draggable = false,
  icon,
  label,
  opacity = 1.0,
  optimized = true,
  place,
  position,
  shape,
  title,
  visible = true,
  zIndex,
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
    (undefined as unknown) as google.maps.Marker,
  )

  useEffect(() => {
    if (state.map === undefined) return
    setMarker(
      new google.maps.Marker({
        anchorPoint: anchorPoint,
        animation: animation,
        clickable: clickable,
        draggable: draggable,
        icon: icon,
        label: label,
        map: state.map,
        opacity: opacity,
        optimized: optimized,
        place: place,
        position: position,
        shape: shape,
        title: title,
        visible: visible,
        zIndex: zIndex,
      }),
    )
  }, [state.map])

  useEffect(() => {
    if (marker === undefined) return
    dispatch({type: 'add_marker', marker: marker})
    return () => {
      dispatch({type: 'remove_marker', marker: marker})
    }
  }, [marker])

  // Register google map event listeners
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

  // Modify the google.maps.Marker object when <Marker> props change
  useEffect(() => {
    if (marker === undefined) return
    if (animation !== undefined) marker.setAnimation(animation)
    marker.setClickable(clickable)
    marker.setDraggable(draggable)
    if (icon !== undefined) marker.setIcon(icon)
    if (label !== undefined) marker.setLabel(label)
    marker.setOpacity(opacity)
    if (place !== undefined) marker.setPlace(place)
    marker.setPosition(position)
    if (shape !== undefined) marker.setShape(shape)
    if (title !== undefined) marker.setTitle(title)
    marker.setVisible(visible)
    if (zIndex !== undefined) marker.setZIndex(zIndex)
  }, [
    animation,
    clickable,
    draggable,
    icon,
    label,
    opacity,
    place,
    position,
    shape,
    title,
    visible,
    zIndex,
  ])

  return null
}

export default Marker
