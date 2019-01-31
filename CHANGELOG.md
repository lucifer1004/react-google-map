# CHANGELOG

## [2.1.0] - <2019-01-31>

### CHANGED

- `Marker` and `Polygon` now requires a unique `id` prop
- Use Map to store markers and polygons as `id-element` pairs

## [2.0.0] - <2019-01-28>

### CHANGED

- `MapBox` now requires `opts` prop (google.maps.MapOptions)
- `Marker` now requires `opts` prop (google.maps.MarkerOptions)
- `InfoWindow` now requires `opts` prop (google.maps.InfoWindowOptions)
- `Polygon` now requires `paths` and optionally requires `visible` and `opts`
  prop (google.maps.PolygonOptions). Options other than `paths` or `visible`
  should be set via `opts`.

## [1.0.1] - <2019-01-27>

### FIXED

- Add `lodash.isequal` to deps
- Clean up `package.json`

## [1.0.0] - <2019-01-27>

This is a breaking change.

### CHANGED

- Completely redesigned
- Now there is a global `GoogleMapContext`, users can use exposed
  `GoogleMapContext`, `GoogleMapProvider` and `GoogleMapConsumer`. All
  map-related components should be placed inside this context.
- `MapBox` no longer renders children.
- `MapBox` no longer uses `portalNode` or `PortalComponent`.

## [0.3.0] - <2019-01-26>

### ADDED

- `MapBox` now has two new props, `portalNode` and `PortalComponent`. Powered by
  React Portal, combined use of these two props can help you mount a component
  outside the `MapBox`, while it will still have access to `MapContext`.

## [0.2.3] - <2019-01-26>

### CHANGED

- `MapBox` now has a new prop `mapClass` so that users can define the style of
  the map content via a stylesheet
- `MapBox` prop `style` has been renamed to `mapStyle` to make its function
  clearer
