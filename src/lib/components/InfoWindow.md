A simple InfoWindow:

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../')

;<GoogleMapProvider>
  <MapBox
    mapStyle={{
      height: '50vh',
      width: '100%',
    }}
  />
  <InfoWindow visible />
</GoogleMapProvider>
```
