A simple DrawingManager:

```jsx
const {DrawingManager, GoogleMapProvider, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
    useDrawing
  />
  <DrawingManager />
</GoogleMapProvider>
```
