A simple StreetView:

```jsx
const {GoogleMapProvider, MapBox, StreetView} = require('../')

;<GoogleMapProvider>
  <MapBox />
  <StreetView
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
</GoogleMapProvider>
```
