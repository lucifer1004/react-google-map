A simple Rectangle:

```jsx
const {GoogleMapProvider, MapBox, Rectangle} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <Rectangle id="rectangle" />
</GoogleMapProvider>
```
