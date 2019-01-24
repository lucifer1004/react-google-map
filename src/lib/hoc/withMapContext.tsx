import React from 'react'
import {MapContext} from '../contexts'

const withMapContext = (WrappedComponent: any) => (props: any) => (
  <MapContext.Consumer>
    {({...value}) => <WrappedComponent {...value} {...props} />}
  </MapContext.Consumer>
)

export default withMapContext
