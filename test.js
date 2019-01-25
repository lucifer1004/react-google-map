var reactDocs = require('react-docgen-typescript')
console.log(
  'Test',
  reactDocs.parse(`
  import React, {useContext, useEffect, useState} from 'react'
  import {useGoogleListener} from '..'
  import {MapContext} from '../contexts'
  
  interface PolygonProps extends google.maps.PolygonOptions {
    onClick?: (event: google.maps.MouseEvent) => any
    onDoubleClick?: (event: google.maps.MouseEvent) => any
    onDrag?: (event: google.maps.MouseEvent) => any
    onDragEnd?: (event: google.maps.MouseEvent) => any
    onDragStart?: (event: google.maps.MouseEvent) => any
    onMouseDown?: (event: google.maps.MouseEvent) => any
    onMouseOut?: (event: google.maps.MouseEvent) => any
    onMouseOver?: (event: google.maps.MouseEvent) => any
    onMouseUp?: (event: google.maps.MouseEvent) => any
    onRightClick?: (event: google.maps.MouseEvent) => any
  }

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
  
`),
)

console.log(
  'Test',
  reactDocs.parse(`
  import * as React from 'react';
  import { Component } from 'react';
  
  /**
   * Column properties.
   */
  export interface IColumnProps {
      /** prop1 description */
      prop1?: string;
      /** prop2 description */
      prop2: number;
      /**
       * prop3 description
       */
      prop3: () => void;
      /** prop4 description */
      prop4: 'option1' | 'option2' | 'option3';
  }
  
  /**
   * Form column.
   */
  export class Column extends Component<IColumnProps, {}> {
      render() {
          return <div>Test</div>;
      }
  }
  
`),
)
