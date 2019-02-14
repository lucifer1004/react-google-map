A simple HeatMap:

```jsx
const {GoogleMapProvider, HeatMap, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    apiKey=""
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    opts={{
      center: {lat: 39, lng: 116},
      zoom: 14,
    }}
    LoadedComponent={() => null}
    useVisualization
  />
  <HeatMap data={[{lat: 39, lng: 116}, {lat: 39.01, lng: 116.02}]} />
</GoogleMapProvider>
```

**Note**: If you cannot see the heat map, just refresh the page. This is because
you have loaded the Google Map script on other pages, and the `Visualization`
library is not loaded.
