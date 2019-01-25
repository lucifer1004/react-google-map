import {addParameters, configure} from '@storybook/react'

addParameters({
  options: {
    name: 'React Google Map',
    url: 'https://github.com/lucifer1004/react-gmap',
    goFullScreen: false,
    showAddonsPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\./,
    hierarchyRootSeparator: /\|/,
    enableShortcuts: true,
  },
})

const loadStories = () => {
  require('../src/stories')
  // You can require as many stories as you need.
}

configure(loadStories, module)
