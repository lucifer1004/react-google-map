A simple InfoWindow:

```jsx
const {GoogleMapProvider, MapBox, InfoWindow} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <InfoWindow visible />
</GoogleMapProvider>
```
