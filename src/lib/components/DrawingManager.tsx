import React, {useContext, useEffect, useRef, useState} from 'react'
import {DEFAULT_DRAWING_MANAGER_OPTIONS} from '../common/constants'
import {DrawingManagerProps, GoogleMapShape} from '../common/types'
import {GoogleMapContext} from '../contexts/GoogleMapContext'
import {useGoogleListener} from '../hooks'

const DrawingManager = ({
  opts = DEFAULT_DRAWING_MANAGER_OPTIONS,
  onCircleComplete,
  onMarkerComplete,
  onOverlayComplete,
  onPolygonComplete,
  onPolylineComplete,
  onRectangleComplete,
}: DrawingManagerProps) => {
  const drawingManagerId = 'drawing-manager'
  const {state, dispatch} = useContext(GoogleMapContext)
  const [drawingManager, setDrawingManager] = useState<
    google.maps.drawing.DrawingManager | undefined
  >(undefined)
  const [shapeCount, setShapeCount] = useState(0)
  const shapeCountRef = useRef(0)
  shapeCountRef.current = shapeCount
  const addShape = (shape: GoogleMapShape) =>
    setShapeCount(shapeCount => {
      dispatch({
        type: 'add_object',
        object: shape,
        id: `${drawingManagerId}-${shapeCount}`,
      })
      return shapeCount + 1
    })

  const removeShapes = () => {
    for (let i = 0; i < shapeCountRef.current; i++) {
      dispatch({type: 'remove_object', id: `${drawingManagerId}-${i}`})
    }
  }

  const addDrawingManager = (
    drawingManager: google.maps.drawing.DrawingManager,
  ) =>
    dispatch({
      type: 'add_object',
      object: drawingManager,
      id: drawingManagerId,
    })
  const removeDrawingManager = () => {
    removeShapes()
    dispatch({type: 'remove_object', id: drawingManagerId})
  }

  useEffect(() => {
    if (state.map === undefined) return
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...opts,
      map: state.map,
    })
    setDrawingManager(drawingManager)
    addDrawingManager(drawingManager)

    // Remove DrawingManager and all shapes
    return () => removeDrawingManager()
  }, [state.map])

  useGoogleListener(drawingManager, [
    {name: 'circlecomplete', handler: onCircleComplete},
    {
      name: 'circlecomplete',
      handler: (circle: google.maps.Circle) => addShape(circle),
    },
    {name: 'markercomplete', handler: onMarkerComplete},
    {
      name: 'markercomplete',
      handler: (marker: google.maps.Marker) => addShape(marker),
    },
    {name: 'overlaycomplete', handler: onOverlayComplete},
    {name: 'polygoncomplete', handler: onPolygonComplete},
    {
      name: 'polygoncomplete',
      handler: (polygon: google.maps.Polygon) => addShape(polygon),
    },
    {name: 'polylinecomplete', handler: onPolylineComplete},
    {
      name: 'polylinecomplete',
      handler: (polyline: google.maps.Polyline) => addShape(polyline),
    },
    {name: 'rectanglecomplete', handler: onRectangleComplete},
    {
      name: 'rectanglecomplete',
      handler: (rectangle: google.maps.Rectangle) => addShape(rectangle),
    },
  ])

  useEffect(() => {
    if (drawingManager === undefined || opts === undefined) return
    drawingManager.setOptions(opts)
  }, [opts])

  return null
}

DrawingManager.displayName = 'DrawingManager'

export default DrawingManager
