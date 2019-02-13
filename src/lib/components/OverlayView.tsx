import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {OverlayViewProps} from '../common/types'

const OverlayView: React.FunctionComponent<OverlayViewProps> = ({
  pane = 'overlayLayer',
  position,
  children,
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
