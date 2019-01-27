import React from 'react'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {
  SimpleMapBox,
  WithInfoWindow,
  WithMarker,
  WithPolygon,
  MarkerDraggable,
} from './components'

storiesOf('MapBox', module)
  .addDecorator(withNotes())
  .add('default', () => <SimpleMapBox />)
  .add('with marker', () => <WithMarker />)
  .add('with info window', () => <WithInfoWindow />)
  .add('with polygon', () => <WithPolygon />)

storiesOf('Marker', module).add('draggable', () => <MarkerDraggable />)
