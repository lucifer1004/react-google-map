A simple MapBox:

```jsx
const {GoogleMapProvider, MapBox} = require('../')

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
  />
</GoogleMapProvider>
```
