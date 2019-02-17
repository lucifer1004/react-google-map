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
            'src/lib/components/{Circle,InfoWindow,Marker,OverlayView,Polygon,Polyline,Rectangle}.tsx',
          // exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          // usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Additional Layers',
          components: 'src/lib/components/{BicyclingLayer}.tsx',
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
