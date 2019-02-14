A simple StreetView:

```jsx
const {GoogleMapProvider, MapBox, StreetView} = require('../')

;<GoogleMapProvider>
  <MapBox apiKey="" mapStyle={{}} LoadedComponent={() => null} />
  <StreetView
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    opts={{
      position: {lat: 40.7128, lng: -74.006},
    }}
    visible
  />
</GoogleMapProvider>
```
