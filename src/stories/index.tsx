import React from 'react'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {SimpleMapBox, WithInfoWindow, WithMarker} from './components'

storiesOf('MapBox', module)
  .addDecorator(withNotes())
  .add('default', () => <SimpleMapBox />, {notes: 'A very simple component'})
  .add('with marker', () => <WithMarker />)
  .add('with info window', () => <WithInfoWindow />)
