A simple StreetView:

```jsx
const {GoogleMapProvider, MapBox, StreetView} = require('../')

;<GoogleMapProvider>
  <MapBox apiKey="" LoadedComponent={null} />
  <StreetView
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
</GoogleMapProvider>
```
