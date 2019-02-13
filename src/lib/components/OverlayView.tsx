import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {OverlayViewProps} from '../common/types'

const OverlayView: React.FunctionComponent<OverlayViewProps> = ({
  pane = 'overlayMouseTarget',
  position,
  children,
  onClick,
  onDoubleClick,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onTouchEnd,
  onTouchStart,
  disableMapHits,
  disableMapHitsAndGestures,
}) => {
  const {state} = useContext(GoogleMapContext)
  const [container] = useState<HTMLDivElement>(document.createElement('div'))
  const [_overlay, setOverlay] = useState(
    (undefined as unknown) as google.maps.OverlayView,
  )

  useEffect(() => {
    if (state.map === undefined) return
    const overlay = new google.maps.OverlayView()
    overlay.onAdd = () => {
      container.style.position = 'absolute'
      container.onclick = onClick || null
      container.ondblclick = onDoubleClick || null
      container.onmousedown = onMouseDown || null
      container.onmouseover = onMouseOver || null
      container.onmouseout = onMouseOut || null
      container.onmouseup = onMouseUp || null
      container.ontouchend = onTouchEnd || null
      container.ontouchstart = onTouchStart || null

      // @types/googlemap does not define `preventMapHitsFrom` or `preventMapHitsAndGesturesFrom`
      if (disableMapHitsAndGestures)
        (google.maps.OverlayView as any).preventMapHitsAndGesturesFrom(
          container,
        )
      else if (disableMapHits)
        (google.maps.OverlayView as any).preventMapHitsFrom(container)

        // Use an ugly cast to avoid package bundle issue
      ;(overlay.getPanes() as any)[pane].appendChild(container)
    }
    overlay.draw = () => {
      const location = overlay
        .getProjection()
        .fromLatLngToDivPixel(
          new google.maps.LatLng(position.lat, position.lng),
        )
      container.style.left = JSON.stringify(location.x) + 'px'
      container.style.top = JSON.stringify(location.y) + 'px'
    }
    overlay.onRemove = () => {
      container.parentNode && container.parentNode.removeChild(container)
    }
    overlay.setMap(state.map)
    setOverlay(overlay)
    return () => overlay.setMap(null)
  }, [state.map])

  return ReactDOM.createPortal(children, container)
}

export default OverlayView
