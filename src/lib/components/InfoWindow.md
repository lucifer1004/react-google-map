A simple InfoWindow:

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../')

;<GoogleMapProvider>
  <MapBox
    apiKey=""
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
    LoadedComponent={null}
  />
  <InfoWindow visible />
</GoogleMapProvider>
```
