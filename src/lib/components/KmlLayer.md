A simple KmlLayer
([data source](http://kmlscribe.googlepages.com/SamplesInMaps.kml)):

```jsx
const {GoogleMapProvider, KmlLayer, MapBox} = require('../')

;<GoogleMapProvider>
  <MapBox
    style={{
      height: '50vh',
      width: '100%',
    }}
  />
  <KmlLayer id="kml" />
</GoogleMapProvider>
```
