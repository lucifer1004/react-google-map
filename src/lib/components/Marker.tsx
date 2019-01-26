import React, {useContext, useEffect, useState} from 'react'
import {useGoogleListener} from '../hooks'
import {MapContext} from '../contexts'
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
  const mapContext = useContext(MapContext)
  const [marker, setMarker] = useState(
    (undefined as unknown) as google.maps.Marker,
  )

  useEffect(() => {
    if (mapContext.map === undefined) return
    setMarker(
      new google.maps.Marker({
        anchorPoint: anchorPoint,
        animation: animation,
        clickable: clickable,
        draggable: draggable,
        icon: icon,
        label: label,
        map: mapContext.map,
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
  }, [mapContext])

  useEffect(() => {
    if (marker === undefined || mapContext.markers === undefined) return
    mapContext.markers.push(marker)
  }, [marker])

  // Register google map event listeners
  useGoogleListener(marker, 'animation_changed', onAnimationChanged)
  useGoogleListener(marker, 'click', onClick)
  useGoogleListener(marker, 'clickable_changed', onClickableChanged)
  useGoogleListener(marker, 'cursor_changed', onCursorChanged)
  useGoogleListener(marker, 'dblclick', onDoubleClick)
  useGoogleListener(marker, 'drag', onDrag)
  useGoogleListener(marker, 'dragend', onDragEnd)
  useGoogleListener(marker, 'draggable_changed', onDraggableChanged)
  useGoogleListener(marker, 'dragstart', onDragStart)
  useGoogleListener(marker, 'flat_changed', onFlatChanged)
  useGoogleListener(marker, 'icon_changed', onIconChanged)
  useGoogleListener(marker, 'mousedown', onMouseDown)
  useGoogleListener(marker, 'mouseout', onMouseOut)
  useGoogleListener(marker, 'mouseover', onMouseOver)
  useGoogleListener(marker, 'mouseup', onMouseUp)
  useGoogleListener(marker, 'position_changed', onPositionChanged)
  useGoogleListener(marker, 'rightclick', onRightClick)
  useGoogleListener(marker, 'shape_changed', onShapeChanged)
  useGoogleListener(marker, 'title_changed', onTitleChanged)
  useGoogleListener(marker, 'visible_changed', onVisibleChanged)
  useGoogleListener(marker, 'zindex_changed', onZIndexChanged)

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
