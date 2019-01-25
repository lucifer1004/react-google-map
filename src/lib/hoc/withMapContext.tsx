import React from 'react'
import {MapContext} from '../contexts'

/**
 * This HOC is used to give the wrapped component access to a MapBox's context.
 *
 * @remarks
 * The wrapped component should be placed within a MapBox instance.
 *
 * @param WrappedComponent - The component to be wrapped
 * @returns The wrapped component
 */
const withMapContext = (WrappedComponent: any) => (props: any) => (
  <MapContext.Consumer>
    {({...value}) => <WrappedComponent {...value} {...props} />}
  </MapContext.Consumer>
)

export default withMapContext
