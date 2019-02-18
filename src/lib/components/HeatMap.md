A simple HeatMap:

```jsx
const {GoogleMapProvider, HeatMap, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    useVisualization
  />
  <HeatMap />
</GoogleMapProvider>
```

**Note**: If you cannot see the heat map, just refresh the page. This is because
you have loaded the Google Map script on other pages, and the `Visualization`
library is not loaded.
