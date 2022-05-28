# Geovisto Marker Layer Tool
Extension of the [Geovisto core library](https://github.com/geovisto/geovisto) which provides the marker layer.

This repository is a snapshot of Geoviosto ``tools/layers/marker`` derived from the development repository: [geovisto/geovisto-map](https://github.com/geovisto/geovisto-map).

![sample](https://user-images.githubusercontent.com/1479229/131530815-11f77c51-3069-42fa-8f29-002b86364d24.png)


## Usage

```js
import { GeovistoMarkerLayerTool } from 'geovisto-layer-marker';
import 'geovisto-layer-marker/dist/index.css';

// create instance of map with given props
const map = Geovisto.createMap({
  // ...
  tools?: Geovisto.createMapToolsManager([
    // instances of Geovisto tools (extensions) which will be directly used in the map
    // ...
    GeovistoMarkerLayerTool.createTool({
      id: "geovisto-tool-layer-marker"
      dimensions?: ...; // provide instance of IMarkerLayerToolDimensions to override dimensions
      geoData?: ...; // provide instance of IGeoDataManager to override geographical data manager
    }),
  ])
});

// rendering of the map
map.draw(Geovisto.getMapConfigManagerFactory().default({
  // initial settings of the map can be overriden by the map config - JSON structure providing user settings 
  // ...
  tools?: [
    // config of Geovisto tools (extensions) used in the map
    {
      "type": "geovisto-tool-layer-marker",
      "id": "geovisto-tool-layer-marker",
      "enabled?": true,
      // mapping of data domains to data dimensions
      "data": {
        "geoData": "world centroids", // geo data id
        "geoId": "to", // data domain
        "value": "value", // data domain
        "aggregation": "sum", // [ "sum", "count" ]
        "category": "state" // data domain
        "units": "$", // units shortcut
        "unitsDesc": "US Dollars", // units label
        "round": 1 // rounding
      }
    },
  ]
}));
```

## Installation

```
npm install --save geovisto-layer-marker
```

Peer dependencies:
```
npm install --save geovisto leaflet
```

This package serves as an extension of Geovisto core using the API for Geovisto tools (extensions). Follow Geovisto core on [Github](https://github.com/geovisto/geovisto).

## License

[MIT](https://github.com/geovisto/geovisto-layer-marker/blob/master/LICENSE)

