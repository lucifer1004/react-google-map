module.exports = {
  title: '@lucifer1004/react-google-map',
  sections: [
    {
      name: 'Introduction',
      content: 'src/lib/docs/Introduction.md',
    },
    {
      name: 'Installation',
      content: 'src/lib/docs/Installation.md',
    },
    {
      name: 'Basic UI Components',
      sections: [
        {
          name: 'Map Containers',
          components: 'src/lib/components/{MapBox,StreetView}.tsx',
        },
        {
          name: 'Attachments',
          components:
            'src/lib/components/{InfoWindow,Marker,OverlayView,Polygon}.tsx',
          // exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          // usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
        },
      ],
    },
    {
      name: 'Visualization',
      components: 'src/lib/components/HeatMap.tsx',
    },
  ],
  pagePerSection: true,
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts/config/webpack.config')('development'),
}
